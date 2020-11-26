import { prisma } from "../../../../generated/prisma-client";
import { format, subHours } from "date-fns";

export default {
  Mutation: {
    createDailyJournal: async (_, args, { request, isAuthenticated }) => {
      const user = await isAuthenticated(request);

      const today = subHours(new Date(format(new Date(), "yyyy-MM-dd")), 9);
      const tomorrow = subHours(new Date(today), 9);
      tomorrow.setDate(today.getDate() + 1);
      const exists = await prisma.$exists.dailyJournal({
        AND: [
          {
            createdAt_gte: today
          },
          {
            createdAt_lt: tomorrow
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
