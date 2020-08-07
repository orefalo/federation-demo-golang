package graph

import "services/products/graph/model"

var hats = []*model.Product{
	&model.Product{
		Upc:    "1",
		Name:   str("Table"),
		Price:  num(899),
		Weight: num(100),
	},
	&model.Product{
		Upc:    "2",
		Name:   str("Couch"),
		Price:  num(1299),
		Weight: num(1000),
	},
	&model.Product{
		Upc:    "3",
		Name:   str("Chair"),
		Price:  num(54),
		Weight: num(50),
	},
}

func str(s string) *string { return &s }

func num(i int) *int { return &i }
