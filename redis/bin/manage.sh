#!/bin/bash

# RDD - We rely on CONSUL being set in our environment (we may or may not be using a local consul agent)
# CONSUL=localhost

# RDD - This value wasn't defined locally or in the setup or make files
MASTER_WAIT_TIMEOUT=120

readonly lockPath=service/redis/locks/master

consulCommand() {
    consul-cli --quiet --consul="${CONSUL}:8500" $*
}

preStart() {
    logDebug "preStart"

    if [[ -n ${CONSUL_LOCAL_CONFIG} ]]; then
        echo "$CONSUL_LOCAL_CONFIG" > "/opt/consul/config/local.json"
    fi
}

onStart() {
    logDebug "onStart"

    echo "CONSUL is ${CONSUL}"

    waitForLeader

    getRegisteredServiceName
    if [[ "${registeredServiceName}" == "redis-replica" ]]; then

        echo "Getting master address"

        if [[ "$(consulCommand catalog service "redis" | jq any)" == "true" ]]; then
            # only wait for a healthy service if there is one registered in the catalog
            local i
            for (( i = 0; i < ${MASTER_WAIT_TIMEOUT-60}; i++ )); do
                getServiceAddresses "redis"
                if [[ ${serviceAddresses} ]]; then
                    break
                fi
                sleep 1
            done
        fi

        if [[ ! ${serviceAddresses} ]]; then
            echo "No healthy master, trying to set this node as master"

            logDebug "Locking ${lockPath}"
            local session=$(consulCommand kv lock "${lockPath}" --ttl=30s --lock-delay=5s)
            echo ${session} > /var/run/redis-master.sid

            getServiceAddresses "redis"
            if [[ ! ${serviceAddresses} ]]; then
                echo "Still no healthy master, setting this node as master"

                setRegisteredServiceName "redis"
                #exit 2
            fi

            logDebug "Unlocking ${lockPath}"
            consulCommand kv unlock "${lockPath}" --session="$session"
        fi

    else

        local session=$(< /var/run/redis-master.sid)
        if [[ "$(consulCommand kv lock "${lockPath}" --ttl=30s --session="${session}")" != "${session}" ]]; then
            echo "This node is no longer the master"

            setRegisteredServiceName "redis-replica"
            #exit 2
        fi

    fi

    if [[ ${serviceAddresses} ]]; then
        echo "Master is ${serviceAddresses}"
    else
        getNodeAddress
        echo "Master is ${nodeAddress} (this node)"
        export MASTER_ADDRESS=${nodeAddress}
    fi
    if [[ ! -f /etc/redis.conf ]] && [[ ! -f /etc/sentinel.conf ]]; then
        # don't overwrite sentinel.conf because Sentinel rewrites it with state configuration
        consul-template -consul=${CONSUL}:8500 -once -template=/etc/redis.conf.tmpl:/etc/redis.conf -template=/etc/sentinel.conf.tmpl:/etc/sentinel.conf
        if [[ $? != 0 ]]; then
            exit 1
        fi
    fi
}

health() {
    logDebug "health"

    redis-cli PING | grep PONG > /dev/null
    if [[ $? -ne 0 ]]; then
        echo "redis ping failed"
        exit 1
    fi

    getRedisInfo
    local role=${redisInfo[role]}
    getRegisteredServiceName
    logDebug "Role ${role}, service ${registeredServiceName}"

    if [[ "${registeredServiceName}" == "redis" ]] && [[ "${role}" != "master" ]]; then
        setRegisteredServiceName "redis-replica"
    elif [[ "${registeredServiceName}" == "redis-replica" ]] && [[ "${role}" != "slave" ]]; then
        setRegisteredServiceName "redis"
    elif [[ "${registeredServiceName}" == "redis" ]] && [[ -f /var/run/redis-master.sid ]]; then
        getNodeAddress
        getServiceAddresses "redis"
        if [[ "${nodeAddress}" == "${serviceAddresses}" ]]; then
            local session=$(< /var/run/redis-master.sid)

            logDebug "Unlocking ${lockPath}"
            consulCommand kv unlock "${lockPath}" --session="$session"

            rm /var/run/redis-master.sid
        fi
    fi
}

healthSentinel() {
    logDebug "healthSentinel"
    redis-cli -p 26379 PING | grep PONG > /dev/null
    if [[ $? -ne 0 ]]; then
        echo "sentinel ping failed"
        exit 1
    fi
}

preStop() {
    logDebug "preStop"

    local sentinels=$(redis-cli -p 26379 SENTINEL SENTINELS mymaster | awk '/^ip$/ { getline; print $0 }')
    logDebug "Sentinels to reset: ${sentinels}"
    if [[ -f /var/run/sentinel.pid ]]; then
      kill $(cat /var/run/sentinel.pid)
      rm /var/run/sentinel.pid
    fi

    for sentinel in ${sentinels} ; do
        echo "Resetting sentinel $sentinel"
        redis-cli -h "${sentinel}" -p 26379 SENTINEL RESET "*"
    done
}

waitForLeader() {
    logDebug "Waiting for consul leader"
    local tries=0
    while true
    do
        logDebug "Waiting for consul leader"
        tries=$((tries + 1))
        local leader=$(consulCommand --template="{{.}}" status leader)
        if [[ -n "$leader" ]]; then
            break
        elif [[ $tries -eq 60 ]]; then
            echo "No consul leader"
            exit 1
        fi
        sleep 1
    done
}

getServiceAddresses() {
    local serviceInfo=$(consulCommand health service --passing "$1")
    serviceAddresses=($(echo $serviceInfo | jq -r '.[].Service.Address'))
    logDebug "serviceAddresses $1 ${serviceAddresses[*]}"
}

getRegisteredServiceName() {
    # RDD - containerpilot.json can contain template logic, which kills jq
    # consul-template -consul=${CONSUL}:8500 -once -template=/etc/containerpilot.json:/etc/containerpilot.json.out
    registeredServiceName=$(jq -r '.services[0].name' /etc/containerpilot.json)
}

setRegisteredServiceName() {
    # RDD - containerpilot.json can contain template logic, which kills jq
    #if [[ ! -f /etc/containerpilot.json.orig ]] ; then
    #    echo 'Making backup copy of original containerpilot.json'
    #    cp /etc/containerpilot.json /etc/containerpilot.json.orig
    #fi
    #consul-template -consul=${CONSUL}:8500 -once -template=/etc/containerpilot.json:/etc/containerpilot.json.out
    jq ".services[0].name = \"$1\"" /etc/containerpilot.json  > /etc/containerpilot.json.new
    mv /etc/containerpilot.json.new /etc/containerpilot.json
    kill -HUP 1
}

declare -A redisInfo
getRedisInfo() {
    eval $(redis-cli INFO | tr -d '\r' | egrep -v '^(#.*)?$' | sed -E 's/^([^:]*):(.*)$/redisInfo[\1]="\2"/')
}

getNodeAddress() {
    nodeAddress=$(ifconfig eth0 | awk '/inet addr/ {gsub("addr:", "", $2); print $2}')
}

backupIfTime() {
    echo "Backup if time (not implemented)"
}

logDebug() {
    if [[ "${LOG_LEVEL}" == "DEBUG" ]]; then
        echo "manage: $*"
    fi
}

help() {
    echo "Usage: ./manage.sh preStart       => configure Consul agent"
    echo "       ./manage.sh onStart        => first-run configuration"
    echo "       ./manage.sh health         => health check Redis"
    echo "       ./manage.sh healthSentinel => health check Sentinel"
    echo "       ./manage.sh preStop        => prepare for stop"
}

until
    cmd=$1
    if [[ -z "$cmd" ]]; then
        help
    fi
    shift 1
    $cmd "$@"
    [ "$?" -ne 127 ]
do
    help
    exit
done