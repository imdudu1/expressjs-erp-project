import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    readMail: async (_, args, { request, isAuthenticated }) => {
      const user = await isAuthenticated(request);
      const { id } = args;
      const isExistMail = await prisma.$exists.mail({
        id,
      });

      if (isExistMail) {
        await prisma.updateMail({
          where: {
            id,
          },
          data: {
            isRead: true,
          },
        });
        return true;
      } else {
        return false;
      }
    },
  },
};
