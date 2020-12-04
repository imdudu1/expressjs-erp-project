import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    searchRank: (_, args) => {
      const { term } = args;
      return prisma.ranks({
        where: {
          title_contains: term
        }
      });
    }
  }
};
