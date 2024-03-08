install:
	docker exec -it vanille-client yarn && \
	docker exec -it vanille-playwright yarn
up:
	docker compose up
down:
	docker compose down
ssh-client:
	docker exec -it vanille-client /bin/bash
ssh-playwright:
	docker exec -it vanille-playwright /bin/bash
dev.dev:
	docker exec -it vanille-client yarn dev
docs.preview:
	docker exec -it vanille-client yarn docs:preview
docs.dev:
	docker exec -it vanille-client yarn docs:dev
docs.gen:
	docker exec -it vanille-client yarn docs:build:move
client.dev:
	docker exec -it vanille-client yarn dev
client.build:
	docker exec -it vanille-client yarn build
test:
	docker exec -it vanille-playwright yarn test
test.watch:
	docker exec -it vanille-playwright yarn test:watch
test.coverage:
	docker exec -it vanille-playwright yarn test:coverage
test.upload:
	. send coverage