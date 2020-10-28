import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    // @TODO Log in and check permissions
    createDepartment: async (_, args) => {
      const { title } = args;
      const exists = await prisma.$exists.department({ title });
      if (!!exists) {
        return false;
      } else {
        await prisma.createDepartment({
          title,
        });
        return true;
      }
    },
  },
};
