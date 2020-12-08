import { reviews, usernames } from "./reviews"

export const resolvers = {
  Review: {
    author(review) {
      return { __typename: "User", id: review.authorID }
    },
  },
  User: {
    reviews(user) {
      return reviews.filter((review) => review.authorID === user.id)
    },
    numberOfReviews(user) {
      return reviews.filter((review) => review.authorID === user.id).length
    },
    username(user) {
      const found = usernames.find((username) => username.id === user.id)
      return found ? found.username : null
    },
  },
  Product: {
    reviews(product) {
      return reviews.filter((review) => review.product.upc === product.upc)
    },
  },
}
