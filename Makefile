include .env

ifndef ENV
ENV=dev
endif

ifeq ($(ENV),dev)
SSH_PORT=221
REACT_APP_API_URL=https://chasseauxportails-ws-dev.bcd.tech
endif

ifeq ($(ENV),prod)
SSH_PORT=222
REACT_APP_API_URL=https://chasseauxportails-ws-prod.bcd.tech
endif

build:
	cd / && npm i && CI=false REACT_APP_API_URL="$(REACT_APP_API_URL)" npm run build

deploy: build
	ssh -o StrictHostKeyChecking=no -p $(SSH_PORT) $(SSH_USER)@$(SSH_HOST) "rm -rf $(APP_PATH) && mkdir -p $(APP_PATH)"
	scp -o StrictHostKeyChecking=no -P $(SSH_PORT) -r /build/* $(SSH_USER)@$(SSH_HOST):$(APP_PATH)