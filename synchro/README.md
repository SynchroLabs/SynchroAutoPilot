# Synchro AP

Synchro AP is a Docker image of synchro that implements the AutoPilot Pattern using ContainerPilot, specifically for use in a Synchro application/composition.

In addition to the standard Synchro environment variables supported, you may also specifiy that the Synchro config file (typically config.json) be retreived from a remote URL (using StashBox or other) by specifying:

    SYNCHRO_CONFIG_URL

It is possible to deploy Synchro using the published image: synchro/synchro_ap, without bundling in any deployment-specific files, by specifying a SYNCHRO_CONFIG_URL that points to a config file, which itself configures a remote module store, or by doing the equivalent via environment variables.

That being said, if you wish to bundle your Synchro configuration and/or you Synchro app code, we also support that mode.  Create a directory here (under synchro/) called "init", and in that directory, install Synchro and add any configuration or apps.  Then uncomment the appropriate lines in the Dockerfile so that your Synchro files will be copied into the image.  Then you may build that image.

    mkdir init
    cd init
    npm install -g synchro # if not already installed
    synchro init
    synchro install foo # Your app here
    cd ../..
    docker build -t your_image_name synchro 
