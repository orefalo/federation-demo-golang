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
var chats_1 = require("./chats");
exports.resolvers = {
    Discussion: {
        __resolveReference: function (object) {
            return __assign(__assign({}, object), chats_1.discussions.find(function (discussion) { return discussion.id === object.id; }));
        },
        sender: function (discussion) {
            return { __typename: "User", id: discussion.sender };
        },
        receiver: function (discussion) {
            return { __typename: "User", id: discussion.receiver };
        }
    },
    User: {
        discussions: function (user) {
            return chats_1.discussions.filter(function (discussion) { return [discussion.sender, discussion.receiver].includes(user.id); });
        }
    }
};
