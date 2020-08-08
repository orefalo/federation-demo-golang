"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_snapcore_1 = require("@snapcore/apollo-server-snapcore");
const federation_1 = require("@apollo/federation");
const core_1 = require("@graphql-modules/core");
const InventoryModule = new core_1.GraphQLModule({
    name: "InventoryModule",
    typeDefs: apollo_server_snapcore_1.gql `
    extend type Product @key(fields: "upc") {
      upc: String! @external
      weight: Int @external
      price: Int @external
      inStock: Boolean
      shippingEstimate: Int @requires(fields: "price weight")
    }
  `,
    resolvers: {
        Product: {
            __resolveReference(object) {
                return {
                    ...object,
                    ...inventory.find(product => product.upc === object.upc)
                };
            },
            shippingEstimate(object) {
                if (object.price > 1000)
                    return 0;
                return object.weight * 0.5;
            }
        }
    }
});
const server = new apollo_server_snapcore_1.ApolloServer({
    schema: federation_1.buildFederatedSchema([InventoryModule]),
    context: session => session
});
const inventory = [{ upc: "1", inStock: true }, { upc: "2", inStock: false }, { upc: "3", inStock: true }];
exports.handler = server.createHandler();
