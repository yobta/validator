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

bump:
	npm version patch
	git add .
	git commit -m "bump version"
	git push

publish: test bump
	npm publish

