"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var gateway_1 = require("@apollo/gateway");
var apollo_server_express_1 = require("apollo-server-express");
var gateway = new gateway_1.ApolloGateway({
    serviceList: [
        { name: "accounts", url: "http://localhost:4001" },
        { name: "reviews", url: "http://localhost:4002" },
        { name: "products", url: "http://localhost:4003" },
        { name: "inventory", url: "http://localhost:4004" },
        { name: "chat", url: "http://localhost:4005" },
    ],
    debug: true,
    // reload changed endpoints every10mn - might not be such great idea : prefer k8s rolling update
    experimental_pollInterval: 10 * 60 * 1000,
    // run a service health check before replacing the schema
    serviceHealthCheck: true
});
var app = express_1["default"]();
var path = "/";
var server = new apollo_server_express_1.ApolloServer({
    gateway: gateway,
    introspection: true,
    subscriptions: false,
    mocks: false,
    mockEntireSchema: false,
    playground: true,
    context: function (session) { return session; }
});
//Mount a jwt or other authentication middleware that is run before the GraphQL execution
// app.use(path, jwtCheck)
server.applyMiddleware({ app: app, path: path });
var HOSTNAME = "127.0.0.1";
var PORT = 8082;
app.listen({ port: PORT, hostname: HOSTNAME }, function () {
    return console.log("\uD83D\uDE80 GraphQL Federation Server ready at http://" + HOSTNAME + ":" + PORT + server.graphqlPath);
});
