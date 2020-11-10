import { prisma } from "../../../../generated/prisma-client";

const ACCEPT = "ACCEPT";
const REJECT = "REJECT";

export default {
  Mutation: {
    approveDocs: async (_, args, { request, isAuthenticated }) => {
      const user = await isAuthenticated(request);
      const { id, action, rejectReason } = args;

      const docApproval = await prisma.docApproval({ id });
      const curApproverData = await prisma
        .docApproval({ id })
        .currentApprover();
      const approverUser = await prisma
        .docApproval({ id })
        .currentApprover()
        .approver();

      if (action === ACCEPT) {
        if (docApproval.state !== REJECT) {
          if (approverUser.id === user.id) {
            await prisma.updateApprover({
              where: {
                id: curApproverData.id,
              },
              data: {
                isPass: true,
                approveDate: new Date(),
              },
            });

            const nextApprover = await prisma
              .approver({ id: curApproverData.id })
              .nextApprover();
            await prisma.updateDocApproval({
              where: {
                id,
              },
              data: {
                currentApprover: {
                  connect: {
                    id: nextApprover.id,
                  },
                },
              },
            });
            return true;
          }
        }
      } else if (action === REJECT) {
        await prisma.updateDocApproval({
          where: {
            id,
          },
          data: {
            state: REJECT,
            rejectReason,
          },
        });
        return true;
      }
      return false;
    },
  },
};
