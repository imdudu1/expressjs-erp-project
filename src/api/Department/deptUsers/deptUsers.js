import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    deptUsers: (_, args) =>
      prisma.users({
        where: {
          AND: [
            { isDelete: false },
            {
              department: {
                id: args.id,
              },
            },
          ],
        },
      }),
  },
};
