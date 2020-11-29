import { addHours, startOfDay, differenceInHours } from "date-fns";
import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    createCommuteTime: async (_, args, { request, isAuthenticated }) => {
      const user = await isAuthenticated(request);
      const { startDate, endDate } = args;
      const s = new Date(startDate);
      const e = new Date(endDate);

      let dayShift = differenceInHours(e, s);
      let nightShift = differenceInHours(e, addHours(startOfDay(s), 22));
      if (nightShift <= 0) {
        nightShift = 0;
      }
      let overtime = dayShift - 8;
      if (overtime <= 0) {
        overtime = 0;
      }
      dayShift -= overtime;

      return prisma.createCommuteTime({
        user: {
          connect: {
            id: user.id
          }
        },
        workDateTime: new Date(startDate),
        offWorkDateTime: new Date(endDate),
        workTime: dayShift,
        overWorkTime: overtime,
        nightShiftTime: nightShift
      });
    }
  }
};
