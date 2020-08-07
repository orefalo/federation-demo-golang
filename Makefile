build:
	$(MAKE) -C services/accounts build
	$(MAKE) -C services/inventory build
	$(MAKE) -C services/products build
	$(MAKE) -C services/reviews build
	$(MAKE) -C services/gateway build

start:
	./start.sh
