import { prisma } from "../../../generated/prisma-client";

export default {
  Chat: {
    participants: ({ id }) => prisma.chat({ id }).participants(),
    messages: ({ id }) => prisma.chat({ id }).messages()
  }
};
