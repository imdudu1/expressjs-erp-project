import { prisma } from "../../../../generated/prisma-client";
import * as argon2 from "argon2";

export default {
  Mutation: {
    createAccount: async (_, args) => {
      const { email, username, password, firstName, lastName, birthDay } = args;
      const exists = await prisma.$exists.user({
        OR: [{ username }, { email }],
      });
      if (!!exists) {
        throw Error("Duplicate username or email");
      }
      await prisma.createUser({
        email,
        username,
        password: await argon2.hash(password),
        firstName,
        lastName,
        birthDay,
      });
      return true;
    },
  },
};
