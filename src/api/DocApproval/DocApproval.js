import { prisma } from "../../../generated/prisma-client";

export default {
  DocApproval: {
    approvers: ({ id }) => prisma.docApproval({ id }).approvers(),
    reviewers: ({ id }) => prisma.docApproval({ id }).reviewers(),
    drafter: ({ id }) => prisma.docApproval({ id }).drafter(),
  },
  Approver: {
    approver: ({ id }) => prisma.approver({ id }).approver(),
    nextApprover: ({ id }) => prisma.approver({ id }).nextApprover(),
  },
};
