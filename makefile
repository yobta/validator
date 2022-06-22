build:
	npm run build

lint:
	npm run lint

size-limit: build
	npm run size-limit

typecheck:
	npm run typecheck

test:
	npm run test
	npm run build
	npm run size-limit

check:
	make typecheck
	make test
	make lint

bump:
	npm version patch
	git add .
	git push

deps:
	run ncu
	npm i --force

publish: check bump
	npm publish

