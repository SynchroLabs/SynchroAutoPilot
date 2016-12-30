# SynchroSamples - Synchro sample apps

This app is intended to be installed into a [Synchro Server](https://synchro.io) environment using the [Synchro Command Line Interface](https://www.npmjs.com/package/synchro) tool.  

The Synchro Samples app demonstrates a wide variety of concepts, techniques, controls, layouts, etc. that should be instructive to anyone delving into the world of Synchro app development.

## Installing Synchro Samples

To install in your Synchro Server environment using the Synchro CLI:
```
$ synchro install https://github.com/SynchroLabs/SynchroSamples/archive/master.zip
```

Alternatively, you may use Git to install this app and keep it up to date.  To do that, you will want to clone SynchroSamples (this repo) into the `synchro-apps` directory in your Synchro installation, then install Synchro Samples into your configuration using the Synchro CLI:

```
$ synchro add SynchroSamples synchro-samples
```

## Configuring Synchro Samples

Synchro Samples will usually work out of the box with no configuration.  If you don't see the Synchro cloud logo on the main menu of the Synchro Samples app when running it on the device, you may need to set your `HOST` config value for proper serving of static resources.  See [Static Resources](https://support.synchro.io/hc/en-us/articles/217448657-Static-Resources) in our Help Center for more information.

## Updating Synchro Samples

If you installed this app using `synchro install`, then you may update it (getting the most recent version) at any time by doing:

```
$ synchro install -u synchro-samples
```

Of course if you installed by cloning the repo, then you will use Git to update as appropriate.
