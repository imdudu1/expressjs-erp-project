import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    user: (_, args) => prisma.user({ id: args.id })
  }
};
