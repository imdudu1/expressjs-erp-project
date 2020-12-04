import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    departments: () => prisma.departments()
  }
};
