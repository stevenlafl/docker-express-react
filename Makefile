# Grab environment information (OSX vs Linux)
UNAME := $(shell uname)
DOCKER_COMPOSE_FILE := docker-compose.yml

export PROJECT := $(shell basename $(CURDIR) | tr '[:upper:]' '[:lower:]')
export IMAGE_MAINTAINER := $(shell grep '^IMAGE_MAINTAINER' ./environment | sed 's/^.*=//g' | tr '[:upper:]' '[:lower:]')
LABLE_BASE := ${IMAGE_MAINTAINER}/${PROJECT}

INCLUDE_MAKEFILES=

# This should always be the first target so that we know running make without any
# arguments is going to be nondestructive. The @ is to silence the normal make
# behavior of echo'ing commands before running them.
help: # Show this help
	@echo "Please specify a target. See README for information about targets."
	@echo ""
	@cat Makefile ${INCLUDE_MAKEFILES} | \
	   grep -E '^[a-zA-Z_-]+:.*?#' | \
	   sed 's/:.*# /,/' | \
	   sort | \
	   sed 's/^/\o033[32m/' | # Start Green color on first column \
	   sed 's/,/\o033[0m,/' | # End Green color on first colum \
	   column -N "Target,Description" -t -s ","
	@echo ""
	@echo "Example Usage"
	@echo "make <target>"
	@echo "make clear-cache"

include ${INCLUDE_MAKEFILES}

##
# Core commands
# The following commands are the basis of the development infrastructure.
##

init: docker-rebuild wait-healthy docker-status

# Use this if you would like a target to require that the project containers
# are running before executing the target contents. Note this doesn't test if
# the containers are healthy.
docker-running:
#	docker inspect -f '{{.State.Running}}' ${PROJECT}-{db,php,web} &>/dev/null \
#	  || (echo "Containers are not running" && exit 1)

wait-healthy:
	@echo "Wait for all containers to become healthy"
	@python $(CURDIR)/scripts/docker-compose-wait.py

docker-rebuild: # Update docker images if there have been changes to Dockerfiles
	docker-compose -f ${DOCKER_COMPOSE_FILE} up -d --build
	docker-compose -f ${DOCKER_COMPOSE_FILE} ps

status: docker-status # Alias to docker-status
docker-status: # Display status of containers related to this project
	docker-compose -f ${DOCKER_COMPOSE_FILE} ps

start: docker-start # Alias to docker-start
docker-start: # Start containers for this project
	docker-compose -f ${DOCKER_COMPOSE_FILE} up -d
	docker-compose -f ${DOCKER_COMPOSE_FILE} ps

stop: docker-stop # Alias to docker-stop
docker-stop: # Stop containers for this project
	docker-compose -f ${DOCKER_COMPOSE_FILE} down

restart: docker-restart # Alias to docker-restart
docker-restart: docker-stop docker-start # Restart containers for this project

destroy: docker-destroy # Take down and remove all data related to this project's current state

docker-destroy:
	docker-compose -f ${DOCKER_COMPOSE_FILE} down -v

clean: destroy # Removes all artifacts built via make or docker
	@echo "Removing production tarball"
	rm $(CURDIR)/${PROJECT}-prod.tar || true
	@echo "Removing docker images"
	docker rmi ${LABLE_BASE}{,-prod}-{db,php,web}:latest \
	  || true

rebuild: destroy init # Destroy and rebuild the environment

