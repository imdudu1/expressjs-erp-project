import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    ranks: () => prisma.ranks()
  }
};
