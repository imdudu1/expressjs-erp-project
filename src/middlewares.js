import { prisma } from "../generated/prisma-client";

export const isAuthenticated = async (req) => {
  if (!!req.userId) {
    return await prisma.user({ id: req.userId });
  } else {
    throw Error("You need to login first.");
  }
};
