import { subMonths, startOfDay, addHours } from "date-fns";
import { prisma } from "../../../../generated/prisma-client";

const findWeeksIndex = (date, weeks) => {
  let i = 0;
  for (; i < weeks.length; i++) {
    if (date < weeks[i]) {
      break;
    }
  }
  return i;
};

export default {
  Mutation: {
    allPaySalary: async (_, args, { request, isAuthenticated }) => {
      const loginUser = await isAuthenticated(request);
      const { date } = args;
      const endMonth = addHours(startOfDay(new Date(date)), 9);
      const startMonth = subMonths(endMonth, 1);
      const users = await prisma.users();
      console.log(startMonth, endMonth);
      users.map(async user => {
        const commuteTimeItems = await prisma.commuteTimes({
          where: {
            user: {
              id: user.id
            },
            AND: [
              {
                workDateTime_gte: startMonth
              },
              {
                workDateTime_lt: endMonth
              }
            ]
          }
        });
        if (commuteTimeItems.length === 0) return;

        const wage = user.basePay / 12;
        const hourlyWage = wage / 209;
        let dayShift = 0.0;
        let nightShift = 0.0;
        let overtime = 0.0;
        let holidayWorkTime = 0.0;
        commuteTimeItems.map(commuteTime => {
          const {
            isHoliday,
            workTime,
            overWorkTime,
            nightShiftTime,
          } = commuteTime;

          if (isHoliday) {
            holidayWorkTime += workTime * 1.5;
            holidayWorkTime += overWorkTime * 2.0;
            holidayWorkTime += nightShiftTime * 2.5;
          } else {
            dayShift += workTime;
            overtime += overWorkTime * 1.5;
            nightShift += nightShiftTime * 2.0;
          }
        });
        /*
        const monthSalary = Math.round(
          (dayShift + nightShift + overtime + holidayWorkTime) * hourlyWage
        );
        */
        let monthSalary = Math.round(
          (nightShift + overtime + holidayWorkTime) * hourlyWage
        );
        monthSalary += wage;
        const nationalPension = Math.round(monthSalary * 0.045);
        const healthInsurance = Math.round(monthSalary * 0.03335);
        const employmentInsurance = Math.round(monthSalary * 0.008);

        await prisma.createSalary({
          user: {
            connect: {
              id: user.id
            }
          },
          nationalPension,
          healthInsurance,
          employmentInsurance,
          holidayAmount: Math.round(holidayWorkTime * hourlyWage),
          //dayShiftAmount: Math.round(dayShift * hourlyWage),
          dayShiftAmount: Math.round(wage),
          nightShiftAmount: Math.round(nightShift * hourlyWage),
          overtimeAmount: Math.round(overtime * hourlyWage)
        });
      });

      return true;
    }
  }
};
