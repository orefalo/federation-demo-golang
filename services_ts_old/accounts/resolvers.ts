import { users } from "./users"

export const resolvers = {
  Query: {
    me() {
      return users[0]
    },
  },
  User: {
    __resolveReference(object) {
      return users.find((user) => user.id === object.id)
    },
  },
}
