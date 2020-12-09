"use strict";
exports.__esModule = true;
exports.resolvers = void 0;
var products_1 = require("./products");
exports.resolvers = {
    Product: {
        __resolveReference: function (object) {
            return products_1.products.find(function (product) { return product.upc === object.upc; });
        }
    },
    Query: {
        topProducts: function (_, args) {
            return products_1.products.slice(0, args.first);
        }
    }
};
