import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    searchUser: async (_, args) => {
      const { term, beginDate, endDate, deptId } = args;
      let filter = { where: { AND: [] } };

      if (!!term) {
        filter.where.AND.push({
          OR: [
            { username_contains: term },
            { lastName_contains: term },
            { firstName_contains: term },
          ],
        });
      }

      if (!!beginDate) {
        let range = { AND: [{ birthDay_gte: new Date(beginDate) }] };
        if (!!endDate) {
          range.AND.push({ birthDay_lte: new Date(endDate) });
        }
        filter.where.AND.push(range);
      }

      if (!!deptId) {
        filter.where.AND.push({
          department: {
            id: deptId,
          },
        });
      }

      return prisma.users(filter);
    },
  },
};
