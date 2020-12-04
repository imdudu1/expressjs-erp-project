import { prisma } from "../../../../generated/prisma-client";
import {isValidDate} from "../../../utils";
import {addHours, startOfYear, endOfYear} from "date-fns";

export default {
  Query: {
    searchUser: async (_, args) => {
      const { term, beginDate, endDate, deptName } = args;
      let filter = { where: { OR: [] } };

      if (!!term) {
        filter.where.OR.push({
          OR: [
            { username_contains: term },
            { lastName_contains: term },
            { firstName_contains: term },
          ],
        });
      }


      let s = new Date(beginDate);
      let e,
        dateRange = {};
      if (isValidDate(s)) {
        s = startOfYear(s);
        e = endOfYear(s);
        filter.where.OR.push({
          AND: [
            {birthDay_gte: s},
            {birthDay_lte: e}
          ]
        })
      }

      if (!!deptName) {
        filter.where.OR.push({
          department: {
            title_contains: deptName,
          },
        });
      }

      return prisma.users(filter);
    },
  },
};
