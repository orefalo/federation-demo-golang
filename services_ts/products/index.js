"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var fs_1 = __importDefault(require("fs"));
var apollo_server_1 = require("apollo-server");
var buildFederatedSchema_1 = require("@apollo/federation/dist/service/buildFederatedSchema");
var path_1 = require("path");
var parser_1 = require("graphql/language/parser");
var resolvers_1 = require("./resolvers");
var data = fs_1["default"].readFileSync(path_1.join(__dirname, "schema.graphqls"), { encoding: "utf8", flag: "r" });
var parsed = parser_1.parse(data);
if (!parsed || parsed.kind !== "Document") {
    throw new Error("Not a valid GraphQL schema.");
}
console.log(data);
var server = new apollo_server_1.ApolloServer({
    schema: buildFederatedSchema_1.buildFederatedSchema([
        {
            typeDefs: parsed,
            resolvers: resolvers_1.resolvers
        },
    ])
});
var env = process.env.PORT;
if (!env) {
    env = "8080";
}
var port = parseInt(env, 10) || 8080;
server.listen({ hostname: "127.0.0.1", port: port }).then(function (_a) {
    var url = _a.url;
    console.log("\uD83D\uDE80 Server ready at " + url);
});
