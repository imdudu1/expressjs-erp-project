import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    createMainCategory: async (_, args, { request, isAuthenticated }) => {
      const { title } = args;
      return prisma.createMainCategory({
        title,
      });
    },
  },
};
