"use strict";
exports.__esModule = true;
exports.resolvers = void 0;
var reviews_1 = require("./reviews");
exports.resolvers = {
    Review: {
        author: function (review) {
            return { __typename: "User", id: review.authorID };
        }
    },
    User: {
        reviews: function (user) {
            return reviews_1.reviews.filter(function (review) { return review.authorID === user.id; });
        },
        numberOfReviews: function (user) {
            return reviews_1.reviews.filter(function (review) { return review.authorID === user.id; }).length;
        },
        username: function (user) {
            var found = reviews_1.usernames.find(function (username) { return username.id === user.id; });
            return found ? found.username : null;
        }
    },
    Product: {
        reviews: function (product) {
            return reviews_1.reviews.filter(function (review) { return review.product.upc === product.upc; });
        }
    }
};
