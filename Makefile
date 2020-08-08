build_golang:
	$(MAKE) -C services/accounts build
	$(MAKE) -C services/inventory build
	$(MAKE) -C services/products build
	$(MAKE) -C services/reviews build
	$(MAKE) -C services/gateway build

start_golang:
	./start_golang.sh

build_ts:
	$(MAKE) -C services_ts/accounts build
	$(MAKE) -C services_ts/inventory build
	$(MAKE) -C services_ts/products build
	$(MAKE) -C services_ts/reviews build
	$(MAKE) -C services_ts/chat build
	$(MAKE) -C services_ts/gateway build

start_ts:
	./start_ts.sh
