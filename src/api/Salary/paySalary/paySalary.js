import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    paySalary: async (_, args, { request, isAuthenticated }) => {
      const { startDate, endDate } = args;
      const user = await isAuthenticated(request);

      const employees = await prisma.users();
      employees.map((employee) => {});

      const commuteTimes = await prisma.commuteTimes({
        where: {
          AND: [
            { user: employee.id },
            {
              AND: [
                { workDateTime_gte: new Date(startDate) },
                { offWorkDateTime_lt: new Date(endDate) },
              ],
            },
          ],
        },
      });
      commuteTimes.map((commuteTime) => {});
    },
  },
};
