package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"fmt"
	"services/reviews/graph/generated"
	"services/reviews/graph/model"
)

func (r *entityResolver) FindProductByUpc(ctx context.Context, upc string) (*model.Product, error) {
	p := &model.Product{Upc: upc}
	for _, r := range reviews {
		if r.Product.Upc == upc {
			p.Reviews = append(p.Reviews, r)
		}
	}
	return p, nil
}

func (r *entityResolver) FindReviewByID(ctx context.Context, id string) (*model.Review, error) {
	for _, r := range reviews {
		if r.ID == id {
			return r, nil
		}
	}
	return nil, fmt.Errorf("not found")
}

func (r *entityResolver) FindUserByID(ctx context.Context, id string) (*model.User, error) {
	u := &model.User{ID: id}
	for _, user := range usernames {
		if id == user.ID {
			u.Username = user.Username
		}
	}
	for _, r := range reviews {
		if r.Author.ID == id {
			u.Reviews = append(u.Reviews, r)
		}
	}
	return u, nil
}

// Entity returns generated.EntityResolver implementation.
func (r *Resolver) Entity() generated.EntityResolver { return &entityResolver{r} }

type entityResolver struct{ *Resolver }
