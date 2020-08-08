import { ApolloServer, gql } from "@snapcore/apollo-server-snapcore"
import { buildFederatedSchema } from "@apollo/federation"
import { GraphQLModule } from "@graphql-modules/core"

const AccountsModule = new GraphQLModule({
  name: "AccountsModule",
  typeDefs: gql`
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
        return users[0]
      }
    },
    User: {
      __resolveReference(object) {
        return users.find(user => user.id === object.id)
      }
    }
  }
})

const server = new ApolloServer({
  schema: buildFederatedSchema([AccountsModule]),
  context: session => session
})

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
]

export const handler = server.createHandler();
