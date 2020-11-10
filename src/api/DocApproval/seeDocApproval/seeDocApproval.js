import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    seeDocApproval: async (_, args, { request, isAuthenticated }) =>
      prisma.docApproval({ id: args.id }),
  },
};
