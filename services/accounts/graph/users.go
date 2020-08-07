package graph

import "services/accounts/graph/model"

var users = []*model.User{
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
