import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    searchTask: async (_, args, { request, isAuthenticated }) => {
      const { username, beginDate, endDate } = args;
      let filter = { where: { AND: [] } };

      if (!!username) {
        filter.where.AND.push({
          OR: [
            {
              user: {
                OR: [
                  { username_contains: username },
                  { lastName_contains: username },
                  { firstName_contains: username },
                ],
              },
            },
          ],
        });
      }

      if (!!beginDate) {
        let range = { AND: [{ beginDateTime_gte: new Date(beginDate) }] };
        if (!!endDate) {
          range.AND.push({ endDateTime_lt: new Date(endDate) });
        }
        filter.where.AND.push(range);
      }

      return prisma.tasks(filter);
    },
  },
};
