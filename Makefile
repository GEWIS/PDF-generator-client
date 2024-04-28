release: build
	npm run release

build: install
	git submodule update
	rm -rf swagger.json PDF-generator-client.ts
	yarn run spec
	yarn run generate
	yarn run build
	git add -A
	git diff-index --quiet HEAD || git commit -m "build: update version"
	git push

dependencies:
ifeq (, $(shell which dotnet))
	$(error "No dotnet in $(PATH).")
endif

install:
	yarn 

dockerize:
	docker build PDF-generator -t "pdf.docker-registry.gewis.nl/pdf-generator:latest"
	docker push "pdf.docker-registry.gewis.nl/pdf-generator:latest"
