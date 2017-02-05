MAKEFLAGS += --warn-undefined-variables
SHELL := /bin/bash
.SHELLFLAGS := -eu -o pipefail
.DEFAULT_GOAL := build

# Build the docker images
#
build: build-nginx build-synchro build-stashbox build-redis

build-nginx:
	docker build -t synchro/synchro_nginx_ap nginx

build-synchro:
	docker build -t synchro/synchro_ap synchro

build-stashbox:
	docker build -t synchro/stashbox_ap stashbox

build-redis:
	docker build -t synchro/synchro_redis_ap redis

triton.env:
	./setup.sh

# Start the composition on Triton
runtriton: triton.env
	$(eval include triton.env)
	$(eval export $(shell sed 's/=.*//' triton.env))
	docker-compose -f triton-compose.yml up
