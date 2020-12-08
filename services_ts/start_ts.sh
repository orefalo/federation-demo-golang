#!/bin/bash

function cleanup {
    kill "$ACCOUNTS_PID"
    kill "$PRODUCTS_PID"
    kill "$REVIEWS_PID"
    kill "$INVENTORY_PID"
    kill "$CHAT_PID"
}

echo "Please ensure you have run 'make build_ts' first"

trap cleanup EXIT

p=`pwd`

cd $p/accounts
export PORT=4001
node index.js &
ACCOUNTS_PID=$!

cd $p/reviews
export PORT=4002
node index.js &
REVIEWS_PID=$!

cd $p/products
export PORT=4003
node index.js &
PRODUCTS_PID=$!

cd $p/inventory
export PORT=4004
node index.js &
INVENTORY_PID=$!

cd $p/chat
export PORT=4005
node index.js &
CHAT_PID=$!

sleep 4

cd $p/gateway
node index.js