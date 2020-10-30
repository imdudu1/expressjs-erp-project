import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    seeDepartment: async (_, args) => prisma.department({ id: args.id }),
  },
};
