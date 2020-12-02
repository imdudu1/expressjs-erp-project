import { prisma } from "../../../generated/prisma-client";

export default {
  DocApproval: {
    currentApprover: ({ id }) => prisma.docApproval({ id }).currentApprover(),
    approvers: ({ id }) =>
      prisma.docApproval({ id }).approvers({ orderBy: "createdAt_DESC" }),
    reviewers: ({ id }) => prisma.docApproval({ id }).reviewers(),
    drafter: ({ id }) => prisma.docApproval({ id }).drafter(),
  },
  Approver: {
    approver: ({ id }) => prisma.approver({ id }).approver(),
    nextApprover: ({ id }) => prisma.approver({ id }).nextApprover(),
  },
};
