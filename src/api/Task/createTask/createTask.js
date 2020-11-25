import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    createTask: async (_, args, { request, isAuthenticated }) => {
      try {
        const user = await isAuthenticated(request);
        const { journalId, categoryId, comment, beginDate, endDate } = args;
        const sDate = new Date(beginDate);
        const eDate = new Date(endDate);
        const isValid = await prisma.$exists.task({
          AND: [
            {
              user: {
                id: user.id
              }
            },
            {
              OR: [
                {
                  AND: [
                    { beginDateTime_lte: sDate },
                    { endDateTime_gte: sDate }
                  ]
                },
                {
                  AND: [
                    { beginDateTime_lte: eDate },
                    { endDateTime_gte: eDate }
                  ]
                },
                {
                  AND: [
                    { beginDateTime_gte: sDate},
                    { endDateTime_lte: eDate }
                  ]
                }
              ]
            }
          ]
        });

        if (!isValid) {
          const task = await prisma.createTask({
            user: {
              connect: {
                id: user.id
              }
            },
            category: {
              connect: {
                id: categoryId
              }
            },
            beginDateTime: sDate.toISOString(),
            endDateTime: eDate.toISOString(),
            comment
          });

          await prisma.updateCategory({
            where: {
              id: categoryId
            },
            data: {
              tasks: {
                connect: {
                  id: task.id
                }
              }
            }
          });

          await prisma.updateDailyJournal({
            data: {
              tasks: {
                connect: {
                  id: task.id
                }
              }
            },
            where: {
              id: journalId
            }
          });

          return task;
        }
        return Error("Invalid request data");
      } catch (error) {
        return Error(error);
      }
    }
  }
};
