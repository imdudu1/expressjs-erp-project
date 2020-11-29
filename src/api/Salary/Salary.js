import { prisma } from "../../../generated/prisma-client";

export default {
  Salary: {
    user: ({ id }) => prisma.salary({ id }).user(),
    monthSalary: ({ dayShiftAmount, nightShiftAmount, overtimeAmount }) =>
      dayShiftAmount + nightShiftAmount + overtimeAmount
  }
};
