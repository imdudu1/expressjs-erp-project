import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    seeFullMail: async (_, args, { request, isAuthenticated }) => {
      const user = await isAuthenticated(request);
      const { id } = args;
      return prisma.mail({ id });
    },
  },
};
