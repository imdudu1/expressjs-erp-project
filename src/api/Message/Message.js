import { prisma } from "../../../generated/prisma-client";

export default {
  Message: {
    chat: ({ id }) => prisma.message({ id }).chat(),
    from: ({ id }) => prisma.message({ id }).from()
  }
};
