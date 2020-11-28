import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    seeFullMail: async (_, args, { request, isAuthenticated }) => {
      const user = await isAuthenticated(request);
      const { id } = args;
      await prisma.updateMail({
        where: {
          id,
        },
        data: {
          isRead: true,
        },
      });
      return prisma.mail({ id });
    },
  },
};
