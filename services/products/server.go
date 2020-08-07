package main

import (
	"log"
	"net/http"

	"github.com/99designs/gqlgen/example/federation/products/graph"
	"github.com/99designs/gqlgen/example/federation/products/graph/generated"
	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/handler/debug"
)

const defaultPort = "4003"

func main() {

	port := defaultPort

	srv := handler.NewDefaultServer(generated.NewExecutableSchema(generated.Config{Resolvers: &graph.Resolver{}}))
	srv.Use(&debug.Tracer{})

	http.Handle("/", srv)

	log.Printf("connect to http://localhost:%s/ for GraphQL playground", port)
	log.Fatal(http.ListenAndServe("127.0.0.1:"+port, nil))
}
