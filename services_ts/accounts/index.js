"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const apollo_server_snapcore_1 = require("@snapcore/apollo-server-snapcore");
const federation_1 = require("@apollo/federation");
const core_1 = require("@graphql-modules/core");
const AccountsModule = new core_1.GraphQLModule({
    name: "AccountsModule",
    typeDefs: apollo_server_snapcore_1.gql `
    extend type Query {
      me: User
    }

    type User @key(fields: "id") {
      id: ID!
      name: String
      username: String
    }
  `,
    resolvers: {
        Query: {
            me() {
                return users[0];
            }
        },
        User: {
            __resolveReference(object) {
                return users.find(user => user.id === object.id);
            }
        }
    }
});
const server = new apollo_server_snapcore_1.ApolloServer({
    schema: federation_1.buildFederatedSchema([AccountsModule]),
    context: session => session
});
const users = [
    {
        id: "1",
        name: "Ada Lovelace",
        birthDate: "1815-12-10",
        username: "@ada"
    },
    {
        id: "2",
        name: "Alan Turing",
        birthDate: "1912-06-23",
        username: "@complete"
    }
];
exports.handler = server.createHandler();
