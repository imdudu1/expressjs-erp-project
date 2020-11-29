import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    seeSalary: (_, args, { request, isAuthenticated }) =>
      prisma.salary({ id: args.id })
  }
};
