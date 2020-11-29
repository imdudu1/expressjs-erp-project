import { prisma } from "../../../../generated/prisma-client";
import { format, subHours, startOfDay, endOfDay } from "date-fns";

export default {
  Mutation: {
    createDailyJournal: async (_, args, { request, isAuthenticated }) => {
      const user = await isAuthenticated(request);

      const start = subHours(startOfDay(new Date()), 9);
      const end = subHours(endOfDay(new Date()), 9);
      const exists = await prisma.$exists.dailyJournal({
        AND: [
          {
            createdAt_gte: start
          },
          {
            createdAt_lte: end
          }
        ]
      });
      console.log(exists);
      if (exists) {
        return null;
      }
      return prisma.createDailyJournal({
        user: {
          connect: {
            id: user.id
          }
        }
      });
    }
  }
};
