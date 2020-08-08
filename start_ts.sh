#!/bin/bash

function cleanup {
    kill "$ACCOUNTS_PID"
    kill "$PRODUCTS_PID"
    kill "$REVIEWS_PID"
    kill "$INVENTORY_PID"
}

echo "Please ensure you have run 'make build_ts' first"

trap cleanup EXIT

cd ./services_ts/accounts/accounts
node index.js &
ACCOUNTS_PID=$!

./services_ts/products/products
node index.js &
PRODUCTS_PID=$!

./services_ts/reviews/reviews
node index.js &
REVIEWS_PID=$!

./services_ts/inventory/inventory
node index.js &
INVENTORY_PID=$!

sleep 4

cd ./services_ts/gateway
node index.js