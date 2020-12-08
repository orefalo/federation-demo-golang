"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const inventory_1 = require("./inventory");
exports.resolvers = {
    Product: {
        __resolveReference(object) {
            return {
                ...object,
                ...inventory_1.inventory.find((product) => product.upc === object.upc),
            };
        },
        shippingEstimate(object) {
            if (object.price > 1000)
                return 0;
            return object.weight * 0.5;
        },
    },
};
