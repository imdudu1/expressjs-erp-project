import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    createRank: async (_, args) => {
      try {
        const { title } = args;
        let isDefault = args.isDefault || false;
        const [defaultRank] = await prisma.ranks({
          where: {
            isDefault: true
          }
        });
        if (!!defaultRank) {
          await prisma.updateRank({
            where: {
              id: defaultRank.id
            },
            data: {
              isDefault: false
            }
          });
        } else {
          isDefault = true;
        }
        await prisma.createRank({
          title,
          isDefault
        });
        return true;
      } catch (error) {
        return false;
      }
    }
  }
};
