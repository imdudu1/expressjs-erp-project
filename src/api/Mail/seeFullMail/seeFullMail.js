import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    seeFullMail: async (_, args, { request, isAuthenticated }) => {
      const user = await isAuthenticated(request);
      const { id } = args;

      const [mail] = await prisma.mails({
        where: {
          AND: [
            { id },
            {
              to: {
                id: user.id
              }
            }
          ]
        }
      });
      if (!!mail) {
        await prisma.updateMail({
          where: {
            id: mail.id
          },
          data: {
            isRead: true
          }
        });
      }

      return prisma.mail({ id });
    }
  }
};
