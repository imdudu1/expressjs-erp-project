import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    seeChatRooms: async (_, __, { request, isAuthenticated }) => {
      const user = await isAuthenticated(request);
      return prisma.chats({
        where: {
          participants_some: {
            id: user.id
          }
        }
      });
    }
  }
};
