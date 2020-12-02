import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    users: () => prisma.users()
  }
};
