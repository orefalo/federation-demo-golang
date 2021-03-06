import fs from "fs"
import { ApolloServer, makeExecutableSchema } from "apollo-server"
import { buildFederatedSchema } from "@apollo/federation/dist/service/buildFederatedSchema"
import { join } from "path"
import { parse } from "graphql/language/parser"
import { resolvers } from "./resolvers"

const data = fs.readFileSync(join(__dirname, "schema.graphqls"), { encoding: "utf8", flag: "r" })

var parsed = parse(data)
if (!parsed || parsed.kind !== "Document") {
  throw new Error("Not a valid GraphQL schema.")
}

console.log(data)

const server = new ApolloServer({
  schema: buildFederatedSchema([
    {
      typeDefs: parsed,
      resolvers,
    },
  ]),
})

var env = process.env.PORT
if (!env) {
  env = "8080"
}

const port = parseInt(env, 10) || 8080

server.listen({ hostname: "127.0.0.1", port }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`)
})
