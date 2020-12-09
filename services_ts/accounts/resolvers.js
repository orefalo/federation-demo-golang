"use strict";
exports.__esModule = true;
exports.resolvers = void 0;
var users_1 = require("./users");
exports.resolvers = {
    Query: {
        me: function () {
            return users_1.users[0];
        }
    },
    User: {
        __resolveReference: function (object) {
            return users_1.users.find(function (user) { return user.id === object.id; });
        }
    }
};
