install:
	docker exec -it client yarn && \
	docker exec -it playwright yarn
up:
	docker compose up
down:
	docker compose down
ssh-client:
	docker exec -it client /bin/bash
ssh-playwright:
	docker exec -it playwright /bin/bash
dev.dev:
	docker exec -it client yarn dev
docs.preview:
	docker exec -it client yarn docs:preview
docs.dev:
	docker exec -it client yarn docs:dev
docs.gen:
	docker exec -it client yarn docs:build:move
client.dev:
	docker exec -it client yarn dev
client.build:
	docker exec -it client yarn build
test:
	docker exec -it playwright yarn test
test.watch:
	docker exec -it playwright yarn test:watch
test.coverage:
	docker exec -it playwright yarn test:coverage
test.upload:
	. send coverage