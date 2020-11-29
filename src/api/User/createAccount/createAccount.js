import { prisma } from "../../../../generated/prisma-client";
import * as argon2 from "argon2";

export default {
  Mutation: {
    createAccount: async (_, args) => {
      const {
        email,
        username,
        password,
        firstName,
        lastName,
        birthDay,
        address,
        addressDetail
      } = args;
      const exists = await prisma.$exists.user({
        OR: [{ username }, { email }]
      });
      if (!!exists) {
        throw Error("종복된 username 또는 email입니다.");
      } else {
        const [baseDept] = await prisma.departments({
          where: {
            isDefault: true
          }
        });
        const [baseRank] = await prisma.ranks({
          where: {
            isDefault: true
          }
        });
        await prisma.createUser({
          email,
          username,
          password: await argon2.hash(password),
          firstName,
          lastName,
          birthDay,
          address,
          department: {
            connect: {
              id: baseDept.id
            }
          },
          rank: {
            connect: {
              id: baseRank.id
            }
          },
          addressDetail
        });
      }
      return true;
    }
  }
};
