import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    seeChatRoom: async (_, args, { request, isAuthenticated }) => {
      const user = await isAuthenticated(request);
      const { id } = args;
      const hasPermRead = await prisma.$exists.chat({
        AND: [
          { id },
          {
            participants_some: {
              id: user.id
            }
          }
        ]
      });

      if (hasPermRead) {
        return prisma.chat({id})
      } else {
        throw Error("참여 중인 대화방이 아닙니다.")
      }
    }
  }
};
