# Synchro AutoPilot

This project is an implementation of the AutoPilot Pattern using ContainerPilot in support of the Synchro Server application.

![StashBox](docs/SynchroWithStashboxJoyent.png)

This project includes the container definition and support files for custom nginx and synchro deployments that are self-orchestrating using ContainerPilot.  For more information on the AutoPilot Pattern using ContainerPilot, see: https://www.joyent.com/containerpilot

The project also contains a Docker composition for running those containers, along with the other containers that they require.

The beauty of self-orchestrating containers is that they can be run from any orchestration solution without need to take any special action other than to run the number of each type of container that is needed.  In this applicaton, new instances of nginx will find the set of Synchro servers to route to, and when Synchro instances appear or dissapear, all nginx servers will automatically update, without your app orchestration system needing to be involved at all.

While this project contains container definitions and support files, that would allow you to build your own images if desired, it should be noted that Synchro can be deployed using only the published containers from the Docker registry (as referenced from the docker-compose.yml file).  Those images are:

    synchro/synchro_ap
    synchro/synchro_nginx_ap

This project also uses StashBox.  For more information on configuring/using StashBox, see: https://github.com/SynchroLabs/StashBox
