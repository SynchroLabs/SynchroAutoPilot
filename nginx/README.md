# Synchro Nginx AP

Synchro Nginx AP is a Docker image of nginx that implements the AutoPilot Pattern using ContainerPilot, specifically for use in a Synchro application/composition.  The published image is located at synchro/synchro_nginx_ap.  In most cases, you should be able to use that image for your deployment.

Following is a description of the environment variables supported:

To replace Nginx configuration template (nginx.conf.ctmpl) from URL (Stashbox or other)

    NGINX_CTMPL_URL

To Enable SSL

    SSL=1

To specify SSL cert/key locations

    SSL_CERTS_PATH // Defaults to /etc/ssl/certs/ssl.crt
    SSL_KEY_PATH   // Defaults to /ect/ssl/private/ssl.key
    SSL_DH_PARAMS_PATH // No default - if not specified, no dhparam will be used in config

To populate SSL cert/key files from base64 encoded env vars

    SSL_CERTS_BASE64
    SSL_KEY_BASE64
    SSL_DH_PARAMS64

To populate SSL cert/key files from URL (Stashbox or other)

    SSL_CERTS_URL
    SSL_KEY_URL
    SSL_DH_PARAMS_URL

Note: It is generally accepted that SSL/TLS implementatons should use at least 2048 bit Diffie-Hellman ephemeral paramters.  This is required, for example, to get above a "B" grade on the SSLLabs.com validation.  You can generate such params like so:

    openssl dhparam 2048 -out dhparam.pem

Synchro AutoPilot Nginx will only use custom DH params if SSL_DH_PARAM_PATH is specied.  If specified, then SSL_DH_BASE64 will be processed if specified, else SSL_DH_PARAMS_URL will be processed if specified, else the params will be generated when the container starts.  Be warned that in this last case it can take anywhere from 15 seconds to several minutes to generate the params, and thus for your nginx container to start.
