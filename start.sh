#!/bin/bash

function cleanup {
    kill "$ACCOUNTS_PID"
    kill "$PRODUCTS_PID"
    kill "$REVIEWS_PID"
    kill "$INVENTORY_PID"
}

trap cleanup EXIT

./services/accounts/accounts &
ACCOUNTS_PID=$!

./services/products/products &
PRODUCTS_PID=$!

./services/reviews/reviews &
REVIEWS_PID=$!

./services/inventory/inventory &
INVENTORY_PID=$!

sleep 4

cd ./services/gateway
node index.js