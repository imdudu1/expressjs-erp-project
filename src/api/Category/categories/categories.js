import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    categories: async (_, args) => {
      const { parentCategoryId } = args;
      if (!!parentCategoryId) {
        return prisma.categories({
          where: {
            parentCategory: {
              id: parentCategoryId
            }
          }
        });
      } else {
        return prisma.categories({
          where: {
            type_lte: 0
          }
        });
      }
    }
  }
};
