import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    mySalaries: async (_, args, { request, isAuthenticated }) => {
      const user = await isAuthenticated(request);
      return prisma.salaries({
        where: {
          user: {
            id: user.id
          }
        }
      });
    }
  }
};
