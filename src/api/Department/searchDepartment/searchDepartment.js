import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    searchDepartment: (_, args) => {
      const { term } = args;
      return prisma.departments({
        where: {
          title_contains: term
        }
      });
    }
  }
};
