import { prisma } from "../../../../generated/prisma-client";

const ACTION_DELETE = "DELETE";
const ACTION_EDIT = "EDIT";

export default {
  Mutation: {
    editDepartment: async (_, args) => {
      try {
        const { id, title, leaderUser, action } = args;
        switch (action) {
          case ACTION_DELETE:
            const users = await prisma.users({
              where: {
                department: {
                  id
                }
              }
            });
            const [defaultDept] = await prisma.departments({
              where: {
                isDefault: true
              }
            });
            if (defaultDept.id === id) {
              return Error("기본 부서는 삭제할 수 없습니다.");
            }
            users.map(async user => {
              await prisma.updateUser({
                where: {
                  id: user.id
                },
                data: {
                  department: {
                    connect: {
                      id: defaultDept.id
                    }
                  }
                }
              });
            });
            await prisma.deleteDepartment({
              id
            });
            break;

          case ACTION_EDIT:
            let data = {};
            if (!!title) {
              data.title = title;
            }
            if (!!leaderUser) {
              data.leaderUser = {
                connect: {
                  id: leaderUser
                }
              };
            }
            await prisma.updateDepartment({
              where: {
                id
              },
              data
            });
            break;

          default:
            break;
        }
        return true;
      } catch (error) {
        return false;
      }
    }
  }
};
