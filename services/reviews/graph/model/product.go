// Code generated by github.com/99designs/gqlgen, DO NOT EDIT.

package model

type Product struct {
	Upc     string    `json:"upc"`
	Reviews []*Review `json:"reviews"`
}

func (Product) IsEntity() {}
