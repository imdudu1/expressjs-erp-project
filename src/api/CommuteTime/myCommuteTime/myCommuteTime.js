import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    myCommuteTime: async (_, args, { request, isAuthenticated }) => {
      const user = await isAuthenticated(request);
      return prisma.commuteTimes({
        where: {
          user: {
            id: user.id
          }
        },
        orderBy: "workDateTime_ASC"
      });
    }
  }
};
