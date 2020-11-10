import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    createDocApproval: async (_, args, { request, isAuthenticated }) => {
      try {
        const user = await isAuthenticated(request);
        const { approvers, reviewers, subject, content, comment } = args;

        const approverDatas = [];
        for (let i = approvers.length - 1, u = -1; i >= 0; i--, u++) {
          let data = {
            approver: {
              connect: {
                id: approvers[i],
              },
            },
          };

          if (i !== approvers.length - 1) {
            data["nextApprover"] = {
              connect: {
                id: approverDatas[u].id,
              },
            };
          }

          const approverData = await prisma.createApprover(data);
          approverDatas.push(approverData);
        }
        approverDatas.reverse();

        await prisma.createDocApproval({
          drafter: {
            connect: {
              id: user.id,
            },
          },
          currentApprover: {
            connect: {
              id: approverDatas[0].id,
            },
          },
          approvers: {
            connect: approverDatas.map((approverData) => {
              return {
                id: approverData.id,
              };
            }),
          },
          reviewers: {
            connect: reviewers.map((reviewer) => {
              return {
                id: reviewer,
              };
            }),
          },
          subject,
          content,
          comment,
        });
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
};
