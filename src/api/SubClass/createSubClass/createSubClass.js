import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    createSubClass: async (_, args, { request, isAuthenticated }) => {
      const { middleCategoryId, title } = args;
      const subClass = await prisma.createSubClass({
        title,
      });

      await prisma.updateMiddleCategory({
        where: {
          id: middleCategoryId,
        },
        data: {
          SubClasses: {
            connect: {
              id: subClass.id,
            },
          },
        },
      });

      return subClass;
    },
  },
};
