import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    seeTask: (_, args) => prisma.task({ id: args.id })
  }
};
