import { products } from "./products"

export const resolvers = {
  Product: {
    __resolveReference(object) {
      return products.find((product) => product.upc === object.upc)
    },
  },
  Query: {
    topProducts(_, args) {
      return products.slice(0, args.first)
    },
  },
}
