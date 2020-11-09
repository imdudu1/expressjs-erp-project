import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    createMiddleCategory: async (_, args, { request, isAuthenticated }) => {
      const { mainCategoryId, title } = args;

      const middleCategory = await prisma.createMiddleCategory({
        title,
      });

      await prisma.updateMainCategory({
        where: {
          id: mainCategoryId,
        },
        data: {
          middleCategories: {
            connect: {
              id: middleCategory.id,
            },
          },
        },
      });

      return middleCategory;
    },
  },
};
