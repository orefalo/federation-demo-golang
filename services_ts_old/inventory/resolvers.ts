import { inventory } from "./inventory"

export const resolvers = {
  Product: {
    __resolveReference(object) {
      return {
        ...object,
        ...inventory.find((product) => product.upc === object.upc),
      }
    },
    shippingEstimate(object) {
      // free for expensive items
      if (object.price > 1000) return 0
      // estimate is based on weight
      return object.weight * 0.5
    },
  },
}
