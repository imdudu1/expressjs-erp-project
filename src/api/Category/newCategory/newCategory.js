import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    newCategory: async (_, args) => {
      try {
        const { title, parentId } = args;

        let data = { title };
        if (!!parentId) {
          const parentCategory = await prisma.category({ id: parentId });
          data["type"] = parentCategory.type + 1;
          data["parentCategory"] = {
            connect: {
              id: parentId
            }
          };
        } else {
          data["type"] = 0;
        }
        return prisma.createCategory(data);
      } catch (e) {
        return Error(e);
      }
    }
  }
};
