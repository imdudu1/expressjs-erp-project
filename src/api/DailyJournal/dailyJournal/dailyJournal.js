import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    dailyJournal: async (_, args, { request, isAuthenticated }) => {
      const user = isAuthenticated(request);
      const { id } = args;
      return prisma.dailyJournal({ id });
    }
  }
};
