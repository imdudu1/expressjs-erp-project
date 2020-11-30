import { addHours, startOfDay, differenceInHours } from "date-fns";
import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    createCommuteTime: async (_, args, { request, isAuthenticated }) => {
      const user = await isAuthenticated(request);
      const { startDate, endDate, isHoliday } = args;
      const s = new Date(startDate);
      const e = new Date(endDate);

      let dayShift = differenceInHours(e, s) - 1 // 휴게시간 제외 기본 9시간 근무라고 가정;
      let nightShift = differenceInHours(e, addHours(startOfDay(s), 22));
      let nightShiftMod = 0;
      if (nightShift > 8) {
        nightShiftMod = nightShift - 8;
        nightShift = 8;
      } else if (nightShift <= 0) {
        nightShift = 0;
      }

      let overtime = dayShift - 8 + nightShiftMod - nightShift;
      if (overtime <= 0) {
        overtime = 0;
      }
      dayShift -= overtime + nightShift;

      return prisma.createCommuteTime({
        user: {
          connect: {
            id: user.id
          }
        },
        isHoliday: isHoliday || false,
        workDateTime: new Date(startDate),
        offWorkDateTime: new Date(endDate),
        workTime: dayShift,
        overWorkTime: overtime,
        nightShiftTime: nightShift
      });
    }
  }
};
