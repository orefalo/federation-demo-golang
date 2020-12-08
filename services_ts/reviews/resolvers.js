"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const reviews_1 = require("./reviews");
exports.resolvers = {
    Review: {
        author(review) {
            return { __typename: "User", id: review.authorID };
        },
    },
    User: {
        reviews(user) {
            return reviews_1.reviews.filter((review) => review.authorID === user.id);
        },
        numberOfReviews(user) {
            return reviews_1.reviews.filter((review) => review.authorID === user.id).length;
        },
        username(user) {
            const found = reviews_1.usernames.find((username) => username.id === user.id);
            return found ? found.username : null;
        },
    },
    Product: {
        reviews(product) {
            return reviews_1.reviews.filter((review) => review.product.upc === product.upc);
        },
    },
};
