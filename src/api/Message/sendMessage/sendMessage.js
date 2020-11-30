import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    sendMessage: async (_, args, { request, isAuthenticated }) => {
      const user = await isAuthenticated(request);
      const { chatRoomId, message, toId } = args;

      let chatRoom = null;
      if (toId !== user.id) {
        if (!!chatRoomId) {
          chatRoom = await prisma.chat({ id: chatRoomId });
        } else {
          chatRoom = await prisma.createChat({
            participants: {
              connect: [{ id: toId }, { id: user.id }]
            }
          });
        }
        if (!!chatRoom) {
          return prisma.createMessage({
            chat: {
              connect: {
                id: chatRoom.id
              }
            },
            from: {
              connect: {
                id: user.id
              }
            },
            text: message
          });
        } else {
          throw Error("Chat room 404 ;(");
        }
      }
      return null;
    }
  }
};
