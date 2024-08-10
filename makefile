alpha: check
	npm publish --tag alpha

build:
	npm run build

lint:
	npm run lint

lf:
	npm run lint:fix

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
	make lint
	make test

bump:
	npm version patch
	git add .
	git push

publish: check bump
	npm publish

browserslist:
	npx browserslist@latest --update-db

up:
	pnpm up -L