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
          await prisma.updateTask({
            where: {
              id,
            },
            data,
          });
        }
        return true;
      } else {
        return false;
      }
    },
  },
};
