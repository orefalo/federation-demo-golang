"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.resolvers = void 0;
var inventory_1 = require("./inventory");
exports.resolvers = {
    Product: {
        __resolveReference: function (object) {
            return __assign(__assign({}, object), inventory_1.inventory.find(function (product) { return product.upc === object.upc; }));
        },
        shippingEstimate: function (object) {
            // free for expensive items
            if (object.price > 1000)
                return 0;
            // estimate is based on weight
            return object.weight * 0.5;
        }
    }
};
