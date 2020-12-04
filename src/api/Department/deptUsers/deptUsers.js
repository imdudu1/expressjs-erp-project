import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    deptUsers: (_, args) =>
      prisma.users({
        where: {
          department: {
            id: args.id
          }
        }
      })
  }
};
