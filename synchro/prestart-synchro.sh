#!/bin/sh
echo Prestart of Synchro

# Get Synchro config.json from remote URL, if so specified
#
if [ -n "$SYNCHRO_CONFIG_URL" ]; then
    echo "Download Synchro config.json template from url"
    curl $SYNCHRO_CONFIG_URL -s -S -f -o /usr/src/app/config.json
    if [ "$?" = "7" ]; then
        echo "Connection refused, retrying in 5 seconds"
        sleep 5
        curl $SYNCHRO_CONFIG_URL -s -S -f -o /usr/src/app/config.json
    fi;
fi;
