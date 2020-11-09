import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    seeMail: async (_, args, { request, isAuthenticated }) => {
      const user = await isAuthenticated(request);
      return prisma.mails({
        where: {
          OR: [
            {
              from: {
                id: user.id,
              },
            },
            {
              to: {
                id: user.id,
              },
            },
          ],
        },
      });
    },
  },
};
