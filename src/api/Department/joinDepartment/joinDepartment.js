import { prisma } from "../../../../generated/prisma-client";

const PLAINT = "PLAIN";
const LEADER = "LEADER";

export default {
  Mutation: {
    joinDepartment: async (_, args, { request }) => {
      try {
        const { userId, deptId, type } = args;
        let data = {
          users: {
            connect: {
              id: userId,
            },
          },
        };
        if (type === LEADER) {
          data.leaderUser = {
            connect: {
              id: userId,
            },
          };
        }

        await prisma.updateDepartment({
          where: {
            id: deptId,
          },
          data,
        });
        return true;
      } catch (error) {
        return false;
      }
    },
  },
};
