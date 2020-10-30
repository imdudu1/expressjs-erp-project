import { prisma } from "../../../../generated/prisma-client";

const ACTION_DELETE = "DELETE";
const ACTION_EDIT = "EDIT";

export default {
  Mutation: {
    editDepartment: async (_, args) => {
      try {
        const { id, title, action } = args;
        switch (action) {
          case ACTION_DELETE:
            await prisma.deleteDepartment({
              id,
            });
            break;

          case ACTION_EDIT:
            await prisma.updateDepartment({
              where: {
                id,
              },
              data: {
                title,
              },
            });
            break;

          default:
            break;
        }
        return true;
      } catch (error) {
        throw Error("Invalid request.");
      }
    },
  },
};
