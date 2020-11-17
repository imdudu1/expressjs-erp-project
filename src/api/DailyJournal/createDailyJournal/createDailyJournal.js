import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    createDailyJournal: async (_, args, { request, isAuthenticated }) => {
      const user = await isAuthenticated(request);

      return prisma.createDailyJournal({
        user: {
          connect: {
            id: user.id
          }
        }
      });
    }
  }
};
