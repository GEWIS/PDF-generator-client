install:
	yarn 

build: install
	rm -rf swagger.json PDF-generator-client.ts
	yarn run spec
	yarn run generate
	yarn run build

release:
	npm run release
