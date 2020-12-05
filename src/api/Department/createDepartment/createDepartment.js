import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    createDepartment: async (_, args) => {
      try {
        const { title } = args;
        let isDefault = args.isDefault || false;
        const [defaultDept] = await prisma.departments({
          where: {
            isDefault: true
          }
        });
        if (isDefault) {
          if (!!defaultDept) {
            await prisma.updateDepartment({
              where: {
                id: defaultDept.id
              },
              data: {
                isDefault: false
              }
            });
          }
        } else {
          if (!!!defaultDept) {
            isDefault = true;
          }
        }
        await prisma.createDepartment({
          title,
          isDefault
        });
        return true;
      } catch (error) {
        return false;
      }
    }
  }
};
