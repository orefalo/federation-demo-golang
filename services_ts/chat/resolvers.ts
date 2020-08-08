import { discussions } from "./chats"

export const resolvers = {
  Discussion: {
    __resolveReference(object) {
      return {
        ...object,
        ...discussions.find((discussion) => discussion.id === object.id),
      }
    },
    sender(discussion) {
      return { __typename: "User", id: discussion.sender }
    },
    receiver(discussion) {
      return { __typename: "User", id: discussion.receiver }
    },
  },
  User: {
    discussions(user) {
      return discussions.filter((discussion) => [discussion.sender, discussion.receiver].includes(user.id))
    },
  },
}
