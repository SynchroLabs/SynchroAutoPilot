# Latest Node.js 4.x LTS
FROM node:argon 

# Add some stuff via apt-get
RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        unzip \
    && rm -rf /var/lib/apt/lists/*

# Install Containerpilot
# Releases at https://github.com/joyent/containerpilot/releases
ENV CONTAINERPILOT_VERSION 2.4.3
RUN export CP_SHA1=2c469a0e79a7ac801f1c032c2515dd0278134790 \
    && curl -Lso /tmp/containerpilot.tar.gz \
         "https://github.com/joyent/containerpilot/releases/download/${CONTAINERPILOT_VERSION}/containerpilot-${CONTAINERPILOT_VERSION}.tar.gz" \
    && echo "${CP_SHA1}  /tmp/containerpilot.tar.gz" | sha1sum -c \
    && tar zxf /tmp/containerpilot.tar.gz -C /bin \
    && rm /tmp/containerpilot.tar.gz

# Install Consul
# Releases at https://releases.hashicorp.com/consul
RUN export CONSUL_VERSION=0.6.4 \
    && export CONSUL_CHECKSUM=abdf0e1856292468e2c9971420d73b805e93888e006c76324ae39416edcf0627 \
    && curl --retry 7 --fail -vo /tmp/consul.zip "https://releases.hashicorp.com/consul/${CONSUL_VERSION}/consul_${CONSUL_VERSION}_linux_amd64.zip" \
    && echo "${CONSUL_CHECKSUM}  /tmp/consul.zip" | sha256sum -c \
    && unzip /tmp/consul -d /usr/local/bin \
    && rm /tmp/consul.zip \
    && mkdir /config

# add ContainerPilot configuration and scripts
COPY containerpilot.json /etc/containerpilot.json
ENV CONTAINERPILOT=file:///etc/containerpilot.json

# Copy the prestart script and make it executable...
COPY prestart-synchro.sh /bin
RUN chmod +x /bin/prestart-synchro.sh

# Copy the sensor script and make it executable...
COPY sensor.sh /bin
RUN chmod +x /bin/sensor.sh

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install Synchro
#
RUN npm install -g synchro
RUN synchro init -v 1.5.14 # to install specific version

# OPTIONAL - Copy app config/source from Synchro installed in init/
#
# COPY init/config.json /usr/src/app
# COPY init/synchro-apps /usr/src/app/synchro-apps

EXPOSE 80

CMD [ "/bin/containerpilot", "node", "app.js" ]
