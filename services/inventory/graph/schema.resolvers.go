package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"services/inventory/graph/model"
)

func (r *productResolver) ShippingEstimate(ctx context.Context, obj *model.Product) (*int, error) {
	// free for expensive items
	if obj.Price != nil && *(obj.Price) > 1000 {
		return integer(0), nil
	}
	if obj.Weight == nil {
		return nil, nil
	}
	return integer(*(obj.Weight) / 2), nil
}

// Product returns generated.ProductResolver implementation.
func (r *Resolver) Product() productResolver { return productResolver{r} }

type productResolver struct{ *Resolver }

func integer(i int) *int {
	return &i
}
