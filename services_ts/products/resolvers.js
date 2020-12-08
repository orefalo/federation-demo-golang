"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const products_1 = require("./products");
exports.resolvers = {
    Product: {
        __resolveReference(object) {
            return products_1.products.find((product) => product.upc === object.upc);
        },
    },
    Query: {
        topProducts(_, args) {
            return products_1.products.slice(0, args.first);
        },
    },
};
