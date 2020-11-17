import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    categories: async (_, args) => {
      const { type } = args;
      if (!!type) {
        return prisma.categories();
      } else {
        return prisma.categories({
          where: {
            type
          }
        });
      }
    }
  }
};
