import { prisma } from "../../../../generated/prisma-client";

export default {
  Subscription: {
    newMessage: {
      subscribe: (_, args) => {
        const { id } = args;
        return prisma.$subscribe
          .message({
            AND: [
              { mutation_in: "CREATED" },
              {
                node: {
                  chat: {
                    id
                  }
                }
              }
            ]
          })
          .node();
      },
      resolve: (payload, args, context) => {
        return payload;
      }
    }
  }
};
