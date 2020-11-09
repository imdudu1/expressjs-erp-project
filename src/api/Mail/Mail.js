import { prisma } from "../../../generated/prisma-client";

export default {
  Mail: {
    to: ({ id }) => prisma.mail({ id }).to(),
    from: ({ id }) => prisma.mail({ id }).from(),
  },
};
