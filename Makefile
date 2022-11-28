.EXPORT_ALL_VARIABLES:

SHELL=/bin/bash -o pipefail

build:
	@docker build -t hekto/hello-world -f hekto/Dockerfile .

run: build
	@docker run -p 8080:8080 hekto/hello-world