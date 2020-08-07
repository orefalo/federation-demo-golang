package main

import (
	"log"
	"net/http"

	"services/accounts/graph"
	"services/accounts/graph/generated"

	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/handler/debug"
)

const IP = "127.0.0.1"
const defaultPort = "4001"

func main() {

	port := defaultPort

	srv := handler.NewDefaultServer(generated.NewExecutableSchema(generated.Config{Resolvers: &graph.Resolver{}}))
	srv.Use(&debug.Tracer{})

	http.Handle("/", srv)

	log.Printf("GraphQL Server live at http://%s:%s/", IP, port)
	log.Fatal(http.ListenAndServe(IP+":"+port, nil))
}
