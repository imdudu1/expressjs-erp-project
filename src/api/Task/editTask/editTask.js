import { prisma } from "../../../../generated/prisma-client";

const DELETE = "DELETE";
const EDIT = "EDIT";

export default {
  Mutation: {
    editTask: async (_, args, { request, isAuthenticated }) => {
      const user = await isAuthenticated(request);
      const { id, comment, beginDate, endDate, action } = args;
      const isExists = await prisma.$exists.task({
        id,
        user: {
          id: user.id,
        },
      });
      if (!!isExists) {
        if (action === DELETE) {
          await prisma.deleteTask({ id });
        } else if (action === EDIT) {
          const data = {};
          if (!!comment) {
            data.comment = comment;
          }
          if (!!beginDate) {
            data.beginDateTime = new Date(beginDate);
          }
          if (!!endDate) {
            data.endDateTime = new Date(endDate);
          }
          const isValid = await prisma.$exists.task({
            AND: [
              {
                id_not: id
              },
              {
                OR: [
                  {
                    AND: [
                      { beginDateTime_lte: new Date(beginDate) },
                      { endDateTime_gte: new Date(beginDate) }
                    ]
                  },
                  {
                    AND: [
                      { beginDateTime_lte: new Date(endDate) },
                      { endDateTime_gte: new Date(endDate) }
                    ]
                  },
                  {
                    AND: [
                      { beginDateTime_gte: new Date(beginDate)},
                      { endDateTime_lte: new Date(endDate) }
                    ]
                  }
                ]
              }
            ]
          });
          if (!isValid) {
            await prisma.updateTask({
              where: {
                id,
              },
              data,
            });
            return true;
          } else {
            return false;
          }
        }
        return true;
      } else {
        return false;
      }
    },
  },
};
