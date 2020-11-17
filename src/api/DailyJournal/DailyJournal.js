import { prisma } from "../../../generated/prisma-client";

export default {
  DailyJournal: {
    user: ({ id }) => prisma.dailyJournal({ id }).user(),
    tasks: ({ id }) => prisma.dailyJournal({ id }).tasks()
  }
};
