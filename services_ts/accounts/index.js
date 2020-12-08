"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const apollo_server_1 = require("apollo-server");
const buildFederatedSchema_1 = require("@apollo/federation/dist/service/buildFederatedSchema");
const path_1 = require("path");
const parser_1 = require("graphql/language/parser");
const resolvers_1 = require("./resolvers");
const data = fs_1.default.readFileSync(path_1.join(__dirname, "schema.graphqls"), { encoding: "utf8", flag: "r" });
var parsed = parser_1.parse(data);
if (!parsed || parsed.kind !== "Document") {
    throw new Error("Not a valid GraphQL schema.");
}
console.log(data);
const server = new apollo_server_1.ApolloServer({
    schema: buildFederatedSchema_1.buildFederatedSchema([
        {
            typeDefs: parsed,
            resolvers: resolvers_1.resolvers,
        },
    ]),
});
var env = process.env.PORT;
if (!env) {
    env = "8080";
}
const port = parseInt(env, 10) || 8080;
server.listen({ hostname: "127.0.0.1", port }).then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
});
