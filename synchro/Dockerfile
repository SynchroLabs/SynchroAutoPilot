# Latest Node.js 4.x LTS
FROM node:argon 

# Get ContainerPilot release
ENV CONTAINERPILOT_VERSION 2.0.1
RUN export CP_SHA1=a4dd6bc001c82210b5c33ec2aa82d7ce83245154 \
    && curl -Lso /tmp/containerpilot.tar.gz \
         "https://github.com/joyent/containerpilot/releases/download/${CONTAINERPILOT_VERSION}/containerpilot-${CONTAINERPILOT_VERSION}.tar.gz" \
    && echo "${CP_SHA1}  /tmp/containerpilot.tar.gz" | sha1sum -c \
    && tar zxf /tmp/containerpilot.tar.gz -C /bin \
    && rm /tmp/containerpilot.tar.gz

# add ContainerPilot configuration and scripts
COPY containerpilot.json /etc/containerpilot.json
ENV CONTAINERPILOT=file:///etc/containerpilot.json

# Copy the prestart script and make it executable...
COPY prestart-synchro.sh /bin
RUN chmod +x /bin/prestart-synchro.sh

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install Synchro
#
RUN npm install -g synchro
RUN synchro init -v 1.5.4 # to install specific version

# OPTIONAL - Copy app config/source from Synchro installed in init/
#
# COPY init/config.json /usr/src/app
# COPY init/synchro-apps /usr/src/app/synchro-apps

EXPOSE 80

CMD [ "/bin/containerpilot", "node", "app.js" ]
