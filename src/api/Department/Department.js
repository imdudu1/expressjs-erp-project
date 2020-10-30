import { prisma } from "../../../generated/prisma-client";

export default {
  Department: {
    leaderUser: ({ id }) => prisma.department({ id }).leaderUser(),
    users: ({ id }) => prisma.department({ id }).users(),
  },
};
