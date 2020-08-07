package graph

import "services/reviews/graph/model"

var reviews = []*model.Review{
	{
		ID:      "1",
		Body:    str("Love it!"),
		Author:  &model.User{ID: "1", Username: str("@ada")},
		Product: &model.Product{Upc: "1"},
	},
	{
		ID:      "2",
		Author:  &model.User{ID: "1", Username: str("@ada")},
		Product: &model.Product{Upc: "2"},
		Body:    str("Too expensive."),
	},
	{
		ID:      "3",
		Author:  &model.User{ID: "2", Username: str("@complete")},
		Product: &model.Product{Upc: "3"},
		Body:    str("Could be better."),
	},
	{
		ID:      "4",
		Author:  &model.User{ID: "2", Username: str("@complete")},
		Product: &model.Product{Upc: "1"},
		Body:    str("Prefer something else."),
	},
}

func str(s string) *string {
	return &s
}
