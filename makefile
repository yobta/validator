build:
	pnpm run build

lint:
	pnpm run lint

size-limit: build
	pnpm run size-limit

typecheck:
	pnpm run typecheck

test:
	pnpm run test
	pnpm run build
	pnpm run size-limit

check:
	make typecheck
	make test
	make lint

bump:
	pnpm version patch
	git add .
	git push

deps:
	pnpm run ncu
	pnpm i --force

publish: check bump
	pnpm publish

browserslist:
	pnpx browserslist@latest --update-db
