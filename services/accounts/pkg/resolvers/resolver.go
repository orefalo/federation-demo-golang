package resolvers

import (
	"context"
	"fmt"

	"github.com/marwan-at-work/federation-demo/services/accounts/pkg/gql_types"
	"github.com/marwan-at-work/federation-demo/services/accounts/pkg/models"
) // THIS CODE IS A STARTING POINT ONLY. IT WILL NOT BE UPDATED WITH SCHEMA CHANGES.

// _Entity represents all types with @key
type _Entity interface {
	Is_Entity()
}

type Resolver struct{}

func (r *Resolver) Entity() EntityResolver {
	return &entityResolver{r}
}
func (r *Resolver) Query() QueryResolver {
	return &queryResolver{r}
}

func (r *Resolver) Mutation() MutationResolver {
	return &mutationResolver{r}
}

type entityResolver struct{ *Resolver }

func (r *entityResolver) FindUserByID(ctx context.Context, id string) (*models.User, error) {
	for _, u := range users {
		if id == u.ID {
			return u, nil
		}
	}
	return nil, fmt.Errorf("not found")
}

type queryResolver struct{ *Resolver }

func (r *queryResolver) Me(ctx context.Context) (*models.User, error) {
	return users[0], nil
}

var users = []*models.User{
	{
		ID:       "1",
		Name:     str("Ada Lovelace"),
		Username: str("@ada"),
	},
	{
		ID:       "2",
		Name:     str("Alan Turing"),
		Username: str("@complete"),
	},
}

func str(s string) *string {
	return &s
}

type mutationResolver struct{ *Resolver }

func (*mutationResolver) CreateUser(ctx context.Context, input gql_types.UserInput) (*models.User, error) {

	return &models.User{
		ID:   "something",
		Name: &input.Name,
	}, nil
}
