import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    userCommuteTime: (_, args) => {
      return prisma.commuteTimes({
        where: {
          user: {
            id: args.id
          }
        },
        orderBy: "workDateTime_ASC"
      });
    }
  }
};
