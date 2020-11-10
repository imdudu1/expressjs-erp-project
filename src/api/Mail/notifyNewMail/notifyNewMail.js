import { prisma } from "../../../../generated/prisma-client";

export default {
  Subscription: {
    notifyNewMail: {
      subscribe: (_, args) => {
        return prisma.$subscribe
          .mail({
            AND: [
              { mutation_in: "CREATED" },
              {
                node: {
                  to: {
                    id: args.id,
                  },
                },
              },
            ],
          })
          .node();
      },
      resolve: (payload, args, context) => {
        return payload;
      },
    },
  },
};
