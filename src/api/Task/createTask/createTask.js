import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    createTask: async (_, args, { request, isAuthenticated }) => {
      const user = await isAuthenticated(request);
      const { subClassId, comment, beginDate, endDate } = args;

      const sDate = new Date(beginDate);
      const eDate = new Date(endDate);

      const isValid = await prisma.$exists.task({
        AND: [
          {
            user: {
              id: user.id,
            },
          },
          {
            OR: [
              {
                AND: [
                  { beginDateTime_gte: sDate.toISOString() },
                  { beginDateTime_lte: eDate.toISOString() },
                ],
              },
              {
                AND: [
                  { endDateTime_gte: sDate.toISOString() },
                  { endDateTime_lte: eDate.toISOString() },
                ],
              },
            ],
          },
        ],
      });

      if (!isValid) {
        const task = await prisma.createTask({
          user: {
            connect: {
              id: user.id,
            },
          },
          beginDateTime: sDate.toISOString(),
          endDateTime: eDate.toISOString(),
          comment,
        });

        await prisma.updateSubClass({
          where: {
            id: subClassId,
          },
          data: {
            tasks: {
              connect: {
                id: task.id,
              },
            },
          },
        });
        return task;
      } else {
        return null;
      }
    },
  },
};
