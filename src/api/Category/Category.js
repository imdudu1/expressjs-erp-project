import { prisma } from "../../../generated/prisma-client";

export default {
  Category: {
    parentCategory: ({ id }) => prisma.category({ id }).parentCategory()
  }
};
