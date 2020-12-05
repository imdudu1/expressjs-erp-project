import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    seeMail: async (_, args, { request, isAuthenticated }) => {
      const user = await isAuthenticated(request);
      return prisma.mails({
        where: {
          OR: [
            {
              to: {
                id: user.id
              }
            },
            {
              from: {
                id: user.id
              }
            }
          ]
        },
        orderBy: "createdAt_DESC"
      });
    }
  }
};
