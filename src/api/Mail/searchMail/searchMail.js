import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    searchMail: async (_, args, { request, isAuthenticated }) => {
      const user = await isAuthenticated(request);
      const { term } = args;
      return prisma.mails({
        where: {
          AND: [
            {
              OR: [
                {
                  to: {
                    id: user.id,
                  },
                },
                {
                  from: {
                    id: user.id,
                  },
                },
              ],
              OR: [
                { subject_contains: term },
                { content_contains: term },
                {
                  from: {
                    OR: [
                      { username_contains: term },
                      { lastName_contains: term },
                      { firstName_contains: term },
                    ],
                  },
                },
              ],
            },
          ],
        },
      });
    },
  },
};
