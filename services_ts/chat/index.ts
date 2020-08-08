const { ApolloServer, gql } = require("apollo-server")
const { buildFederatedSchema } = require("@apollo/federation")
const typeDefs = gql`
  type Discussion @key(fields: "id") {
    id: ID!
    sender: User
    receiver: User
    message: String
  }
  extend type User @key(fields: "id") {
    id: ID! @external
    discussions: [Discussion]
  }
`
const resolvers = {
  Discussion: {
    __resolveReference(object) {
      return {
        ...object,
        ...discussions.find((discussion) => discussion.id === object.id),
      }
    },
    sender(discussion) {
      return { __typename: "User", id: discussion.sender }
    },
    receiver(discussion) {
      return { __typename: "User", id: discussion.receiver }
    },
  },
  User: {
    discussions(user) {
      return discussions.filter((discussion) => [discussion.sender, discussion.receiver].includes(user.id))
    },
  },
}
const server = new ApolloServer({
  debug: true,
  tracing: true,
  schema: buildFederatedSchema([
    {
      typeDefs,
      resolvers,
    },
  ]),
})
server.listen({ port: 4005 }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`)
})
const discussions = [
  {
    id: "1",
    sender: "1",
    receiver: "2",
    message: "@ada > @complete",
  },
  {
    id: "2",
    sender: "2",
    receiver: "1",
    message: "@complete > @ada",
  },
]
