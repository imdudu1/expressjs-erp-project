import { prisma } from "../../../../generated/prisma-client";
import { format, subHours, startOfDay, endOfDay } from "date-fns";

export default {
  Mutation: {
    createDailyJournal: async (_, __, { request, isAuthenticated }) => {
      const user = await isAuthenticated(request);

      const start = startOfDay(new Date());
      const end = endOfDay(new Date());
      const exists = await prisma.$exists.dailyJournal({
        AND: [
          {
            createdAt_gte: start,
          },
          {
            createdAt_lte: end,
          },
        ],
      });
      if (exists) {
        return null;
      }
      return prisma.createDailyJournal({
        user: {
          connect: {
            id: user.id,
          },
        },
      });
    },
  },
};
