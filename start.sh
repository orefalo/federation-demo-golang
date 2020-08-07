#!/bin/bash

function cleanup {
    kill "$ACCOUNTS_PID"
    kill "$PRODUCTS_PID"
    kill "$REVIEWS_PID"
    kill "$INVENTORY_PID"
}
trap cleanup EXIT

p=`pwd`
echo $p
cd $p/services/accounts
go build -o /tmp/srv-accounts
cd $p/services/products
go build -o /tmp/srv-products
cd $p/services/reviews
go build -o /tmp/srv-reviews
cd $p/services/inventory
go build -o /tmp/srv-inventory

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
ts-node index.ts