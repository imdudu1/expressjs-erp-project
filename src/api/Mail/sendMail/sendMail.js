import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    sendMail: async (_, args, { request, isAuthenticated }) => {
      const user = await isAuthenticated(request);
      const { to, subject, content } = args;
      const isExistUser = await prisma.$exists.user({ id: to });
      if (isExistUser) {
        return prisma.createMail({
          to: {
            connect: {
              id: to,
            },
          },
          from: {
            connect: {
              id: user.id,
            },
          },
          subject,
          content,
        });
      } else {
        return null;
      }
    },
  },
};
