# Build the docker images
#
build:
	docker build -t synchro/synchro_nginx_ap nginx
	docker build -t synchro/synchro_ap synchro
