import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    seeDocApproval: async (_, args, { request, isAuthenticated }) => {
      const user = await isAuthenticated(request);
      return prisma.docApprovals({
        where: {
          OR: [
            {
              drafter: {
                id: user.id,
              },
            },
            {
              reviewers_some: {
                id: user.id,
              },
            },
            {
              currentApprover: {
                approver: {
                  id: user.id
                }
              }
            },
          ],
        },
        orderBy: "createdAt_DESC"
      });
    },
  },
};
