import { prisma } from "../../../../generated/prisma-client";

const ACTION_DELETE = "DELETE";
const ACTION_EDIT = "EDIT";

export default {
  Mutation: {
    updateDepartment: async (_, args) => {
      try {
        const { id, title, leaderUser, action } = args;
        switch (action) {
          case ACTION_DELETE:
            await prisma.deleteDepartment({
              id,
            });
            break;

          case ACTION_EDIT:
            let data = {};
            if (!!title) {
              data.title = title;
            }
            if (!!leaderUser) {
              data.leaderUser = {
                connect: {
                  id: leaderUser,
                },
              };
            }
            await prisma.updateDepartment({
              where: {
                id,
              },
              data,
            });
            break;

          default:
            break;
        }
        return true;
      } catch (error) {
        return false;
      }
    },
  },
};
