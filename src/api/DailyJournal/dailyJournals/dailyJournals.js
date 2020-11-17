import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    dailyJournals: async (_, args, { request, isAuthenticated }) => {
      const user = await isAuthenticated(request);
      return prisma.dailyJournals({
        where: {
          user: {
            id: user.id
          }
        }
      });
    }
  }
};
