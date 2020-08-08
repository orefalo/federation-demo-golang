import express from "express"
import { ApolloGateway } from "@apollo/gateway"
import { ApolloServer } from "apollo-server-express"

const gateway = new ApolloGateway({
  serviceList: [
    { name: "accounts", url: "http://localhost:4001" },
    { name: "reviews", url: "http://localhost:4002" },
    { name: "products", url: "http://localhost:4003" },
    { name: "inventory", url: "http://localhost:4004" },
  ],
  debug: true,

  // reload changed endpoints every10mn - might not be such great idea : prefer k8s rolling update
  experimental_pollInterval: 10 * 60 * 1000,
  // run a service health check before replacing the schema
  serviceHealthCheck: true,
})
const app = express()
const path = "/"

const server = new ApolloServer({
  gateway,
  introspection: true,
  subscriptions: false,
  mocks: false,
  mockEntireSchema: false,
  playground: false,
  context: (session) => session,
})

//Mount a jwt or other authentication middleware that is run before the GraphQL execution
// app.use(path, jwtCheck)

server.applyMiddleware({ app, path })

const HOSTNAME = "127.0.0.1"
const PORT = 8082

app.listen({ port: PORT, hostname: HOSTNAME }, () =>
  console.log(`🚀 GraphQL Federation Server ready at http://${HOSTNAME}:${PORT}${server.graphqlPath}`)
)
