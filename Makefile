build_golang:
	$(MAKE) -C services/accounts build
	$(MAKE) -C services/inventory build
	$(MAKE) -C services/products build
	$(MAKE) -C services/reviews build
	$(MAKE) -C services/gateway build

start_golang:
	./start_golang.sh

build_ts:
	cd services_ts && rush update && rush build

start_ts:
	./start_ts.sh
