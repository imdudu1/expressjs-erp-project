import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    createRank: async (_, args) => {
      try {
        const { title } = args;
        await prisma.createRank({
          title,
        });
        return true;
      } catch (error) {
        return false;
      }
    },
  },
};
