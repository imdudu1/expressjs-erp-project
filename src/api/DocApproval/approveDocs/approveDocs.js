import { prisma } from "../../../../generated/prisma-client";

const ACCEPT = "ACCEPT";
const REJECT = "REJECT";

export default {
  Mutation: {
    approveDocs: async (_, args, { request, isAuthenticated }) => {
      const user = await isAuthenticated(request);
      const { id, action, acceptComment, rejectReason } = args;

      const docApproval = await prisma.docApproval({ id });
      const curApproveData = await prisma.docApproval({ id }).currentApprover();
      const approveUser = await prisma
        .docApproval({ id })
        .currentApprover()
        .approver();

      if (action === ACCEPT) {
        if (docApproval.state !== REJECT) {
          if (approveUser.id === user.id) {
            await prisma.updateApprover({
              where: {
                id: curApproveData.id
              },
              data: {
                isPass: true,
                acceptComment,
                approveDate: new Date().toISOString()
              }
            });

            const nextApprover = await prisma
              .approver({ id: curApproveData.id })
              .nextApprover();
            if (nextApprover !== null) {
              await prisma.updateDocApproval({
                where: {
                  id
                },
                data: {
                  currentApprover: {
                    connect: {
                      id: nextApprover.id
                    }
                  }
                }
              });
            } else {
              await prisma.updateDocApproval({
                where: {
                  id
                },
                data: {
                  state: "DONE"
                }
              });
            }
            return true;
          }
        }
      } else if (action === REJECT) {
        await prisma.updateDocApproval({
          where: {
            id
          },
          data: {
            state: REJECT,
            rejectReason
          }
        });
        return true;
      }
      return false;
    }
  }
};
