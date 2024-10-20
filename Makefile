
all: dev

BRANCH_NAME := $(shell git rev-parse --abbrev-ref HEAD)
VERSION_URL := "https://gitlab.com/ekumenlabs/ekumen-website/-/tree/$(BRANCH_NAME)"
VERSION_LABEL := $(BRANCH_NAME)

build_image:
	docker compose build

dev: build_image
	docker compose up --build

check: build_image
	docker compose run ekumen-website yarn run astro check

build: check
	docker compose run ekumen-website yarn run astro build

build_docker:
	docker build -t ekumen-website --build-arg VERSION_URL=$(VERSION_URL) --build-arg VERSION_LABEL=$(VERSION_LABEL) -f Dockerfile .

run_prod_locally: build_docker
	docker run --rm -ti -p 80:80 ekumen-website
