package models

type User struct {
	ID       string  `json:"id"`
	Name     *string `json:"name"`
	Username *string `json:"username"`
}

func (User) Is_Entity() {}
