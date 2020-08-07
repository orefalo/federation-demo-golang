package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"fmt"

	"services/reviews/graph/model"
)

func (r *productResolver) Reviews(ctx context.Context, obj *model.Product) ([]*model.Review, error) {
	var res []*model.Review

	for _, review := range reviews {
		if review.Product.Upc == obj.Upc {
			res = append(res, review)
		}
	}

	return res, nil
}

func (r *userResolver) Username(ctx context.Context, obj *model.User) (*string, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *userResolver) Reviews(ctx context.Context, obj *model.User) ([]*model.Review, error) {
	var res []*model.Review

	for _, review := range reviews {
		if review.Author.ID == obj.ID {
			res = append(res, review)
		}
	}

	return res, nil
}

// Product returns generated.ProductResolver implementation.
func (r *Resolver) Product() productResolver { return productResolver{r} }

// User returns generated.UserResolver implementation.
func (r *Resolver) User() userResolver { return userResolver{r} }

type productResolver struct{ *Resolver }
type userResolver struct{ *Resolver }
