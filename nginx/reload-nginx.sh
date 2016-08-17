#!/bin/sh

# ContainerPilot preStart
#
preStart() {
    echo "preStart"

    # Get SSL certs from env or remote URL, if so specified
    #
    : ${SSL_CERTS_PATH:="/etc/ssl/certs/ssl.crt"}
    if [ -n "$SSL_CERTS_BASE64" ]; then
        echo "Decode SSL_CERTS_BASE64 to $SSL_CERTS_PATH"
        echo $SSL_CERTS_BASE64 | base64 -d > $SSL_CERTS_PATH
    elif [ -n "$SSL_CERTS_URL" ]; then
        echo "Download SSL certs from url to $SSL_CERTS_PATH"
        curl $SSL_CERTS_URL -s -S -f -o $SSL_CERTS_PATH
        if [ "$?" = "7" ]; then
            echo "Connection refused, retrying in 5 seconds"
            sleep 5
            curl $SSL_CERTS_URL -s -S -f -o $SSL_CERTS_PATH
        fi;
    fi;

    # Get SSL key from env or remote URL, if so specified
    #
    : ${SSL_KEY_PATH:="/etc/ssl/private/ssl.key"}
    if [ -n "$SSL_KEY_BASE64" ]; then
        echo "Decode SSL_KEY_BASE64 to $SSL_KEY_PATH"
        echo $SSL_KEY_BASE64 | base64 -d > $SSL_KEY_PATH
    elif [ -n "$SSL_CERTS_URL" ]; then
        echo "Download SSL key from url to $SSL_KEY_PATH"
        curl $SSL_KEY_URL -s -S -f -o $SSL_KEY_PATH
        if [ "$?" = "7" ]; then
            echo "Connection refused, retrying in 5 seconds"
            sleep 5
            curl $SSL_KEY_URL -s -S -f -o $SSL_KEY_PATH
        fi;
    fi;

    # Get Nginx config template from remote URL, if so specified
    #
    if [ -n "$NGINX_CTMPL_URL" ]; then
        echo "Download Nginx config template from url"
        curl $NGINX_CTMPL_URL -s -S -f -o /etc/containerpilot/nginx.conf.ctmpl
        if [ "$?" = "7" ]; then
            echo "Connection refused, retrying in 5 seconds"
            sleep 5
            curl $NGINX_CTMPL_URL -s -S -f -o /etc/containerpilot/nginx.conf.ctmpl
        fi;
    fi;

    # Render Nginx configuration template using values from Consul,
    # but do not reload because Nginx has't started yet
    #
    consul-template \
        -once \
        -consul consul:8500 \
        -template "/etc/containerpilot/nginx.conf.ctmpl:/etc/nginx/nginx.conf"
}

# ContainerPilot onChange
#
onChange() {
    echo "onChange"
    # Render Nginx configuration template using values from Consul,
    # then gracefully reload Nginx
    #
    consul-template \
        -once \
        -consul consul:8500 \
        -template "/etc/containerpilot/nginx.conf.ctmpl:/etc/nginx/nginx.conf:nginx -s reload"
}

until
    cmd=$1
    if [ -z "$cmd" ]; then
        onChange
    fi
    shift 1
    $cmd "$@"
    [ "$?" -ne 127 ]
do
    onChange
    exit
done
