import { prisma } from "../../../generated/prisma-client";

export default {
  Task: {
    user: ({ id }) => prisma.task({ id }).user(),
    category: ({ id }) => prisma.task({ id }).category()
  }
};
