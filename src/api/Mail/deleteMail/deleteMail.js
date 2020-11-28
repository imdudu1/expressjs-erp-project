import {prisma} from "../../../../generated/prisma-client";

export default {
  Mutation: {
    deleteMail: async (_, args, { request, isAuthenticated }) => {
      const user = await isAuthenticated(request);
      const exists = await prisma.$exists.mail({
        AND: [
          {
            id: args.id
          },
          {
            OR: [
              {
                to: {
                  id: user.id
                }
              },
              {
                from: {
                  id: user.id
                }
              }
            ]
          }
        ]
      });

      if (exists) {
        await prisma.deleteMail({ id: args.id });
        return true;
      }
      return false;
    }
  }
};
