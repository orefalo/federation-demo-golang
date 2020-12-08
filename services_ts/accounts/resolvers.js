"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const users_1 = require("./users");
exports.resolvers = {
    Query: {
        me() {
            return users_1.users[0];
        },
    },
    User: {
        __resolveReference(object) {
            return users_1.users.find((user) => user.id === object.id);
        },
    },
};
