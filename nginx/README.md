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

To populate SSL cert/key files from base64 encoded env vars

    SSL_CERTS_BASE64
    SSL_KEY_BASE64

To populate SSL cert/key files from URL (Stashbox or other)

    SSL_CERTS_URL
    SSL_KEY_URL
