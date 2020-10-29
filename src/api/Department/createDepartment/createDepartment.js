import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    // @TODO Log in and check permissions
    createDepartment: async (_, args) => {
      const { title } = args;
      try {
        await prisma.createDepartment({ title });
        return true;
      } catch (error) {
        return false;
      }
    },
  },
};
