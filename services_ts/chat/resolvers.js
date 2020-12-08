"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const chats_1 = require("./chats");
exports.resolvers = {
    Discussion: {
        __resolveReference(object) {
            return Object.assign(Object.assign({}, object), chats_1.discussions.find((discussion) => discussion.id === object.id));
        },
        sender(discussion) {
            return { __typename: "User", id: discussion.sender };
        },
        receiver(discussion) {
            return { __typename: "User", id: discussion.receiver };
        },
    },
    User: {
        discussions(user) {
            return chats_1.discussions.filter((discussion) => [discussion.sender, discussion.receiver].includes(user.id));
        },
    },
};
