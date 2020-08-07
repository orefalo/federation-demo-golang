package graph

import (
	"services/inventory/graph/model"
)

var inventory = []*model.Product{
	{
		Upc:     "1",
		InStock: boolean(true),
	},
	{
		Upc:     "2",
		InStock: boolean(false),
	},
	{
		Upc:     "3",
		InStock: boolean(true),
	},
}

func boolean(b bool) *bool {
	return &b
}
