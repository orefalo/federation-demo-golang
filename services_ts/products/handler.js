"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_snapcore_1 = require("@snapcore/apollo-server-snapcore");
const federation_1 = require("@apollo/federation");
const core_1 = require("@graphql-modules/core");
const ProductsModule = new core_1.GraphQLModule({
    name: "ProductsModule",
    typeDefs: apollo_server_snapcore_1.gql `
    extend type Query {
      topProducts(first: Int = 5): [Product]
    }

    type Product @key(fields: "upc") @key(fields: "sku") {
      upc: String!
      sku: String!
      name: String
      price: Int
      weight: Int
    }
  `,
    resolvers: {
        Product: {
            __resolveReference(object) {
                return products.find(product => product.upc === object.upc);
            }
        },
        Query: {
            topProducts(_, args) {
                return products.slice(0, args.first);
            }
        }
    }
});
const server = new apollo_server_snapcore_1.ApolloServer({
    schema: federation_1.buildFederatedSchema([ProductsModule]),
    context: session => session
});
const products = [
    {
        upc: "1",
        name: "Table",
        price: 899,
        weight: 100
    },
    {
        upc: "2",
        name: "Couch",
        price: 1299,
        weight: 1000
    },
    {
        upc: "3",
        name: "Chair",
        price: 54,
        weight: 50
    }
];
exports.handler = server.createHandler();
