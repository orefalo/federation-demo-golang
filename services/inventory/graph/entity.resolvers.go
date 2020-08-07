package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"fmt"
	"services/inventory/graph/generated"
	"services/inventory/graph/model"
)

func (r *entityResolver) FindProductByUpc(ctx context.Context, upc string) (*model.Product, error) {
	for _, p := range inventory {
		if p.Upc == upc {
			return p, nil
		}
	}
	return nil, fmt.Errorf("%v not found", upc)
}

// Entity returns generated.EntityResolver implementation.
func (r *Resolver) Entity() generated.EntityResolver { return &entityResolver{r} }

type entityResolver struct{ *Resolver }
