#!/bin/bash

function cleanup {
    kill "$ACCOUNTS_PID"
    kill "$PRODUCTS_PID"
    kill "$REVIEWS_PID"
    kill "$INVENTORY_PID"
}
trap cleanup EXIT


/tmp/srv-accounts &
ACCOUNTS_PID=$!

/tmp/srv-products &
PRODUCTS_PID=$!

/tmp/srv-reviews &
REVIEWS_PID=$!

/tmp/srv-inventory &
INVENTORY_PID=$!

sleep 4

cd $p/services/gateway
node index.js