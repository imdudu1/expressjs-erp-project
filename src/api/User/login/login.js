import * as argon2 from "argon2";
import { prisma } from "../../../../generated/prisma-client";
import { generateWebToken } from "../../../utils";

export default {
  Mutation: {
    login: async (_, args) => {
      const { username, password } = args;
      const user = await prisma.user({ username });
      const isValid = await argon2.verify(user.password, password);
      if (!!isValid) {
        await prisma.updateUser({
          where: {
            username,
          },
          data: {
            loggedInAt: new Date().toISOString().slice(0, 10),
          },
        });
        return generateWebToken(user.id);
      } else {
        throw Error("Incorrect username or password");
      }
    },
  },
};
