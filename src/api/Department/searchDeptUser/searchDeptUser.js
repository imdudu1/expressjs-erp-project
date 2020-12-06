import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    searchDeptUser: (_, args) =>
      prisma.users({
        where: {
          AND: [
            {
              isDelete: false,
            },
            {
              department: {
                id: args.deptId,
              },
            },
            {
              OR: [
                { username_contains: args.term },
                { lastName_contains: args.term },
                { firstName_contains: args.term },
              ],
            },
          ],
        },
      }),
  },
};
