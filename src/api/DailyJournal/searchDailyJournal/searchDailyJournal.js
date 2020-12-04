import { prisma } from "../../../../generated/prisma-client";
import { isValidDate } from "../../../utils";
import { startOfDay, endOfDay, addHours } from "date-fns";

export default {
  Query: {
    searchDailyJournal: (_, args) => {
      const { term } = args;

      let s = new Date(term);
      let e,
        dateRange = {};
      if (isValidDate(s)) {
        s = addHours(startOfDay(new Date(s)), 9);
        e = addHours(endOfDay(s), 9);
        dateRange = {
          tasks_some: {
            AND: [{ beginDateTime_gte: s }, { endDateTime_lte: e }]
          }
        };
      }

      return prisma.dailyJournals({
        where: {
          OR: [
            {
              user: {
                OR: [
                  { username_contains: term },
                  { firstName_contains: term },
                  { lastName_contains: term }
                ]
              }
            },
            {
              tasks_some: {
                comment_contains: term
              }
            },
            dateRange
          ]
        }
      });
    }
  }
};
