import * as argon2 from "argon2";
import { prisma } from "../../../../generated/prisma-client";

const DELETE = "DELETE";
const EDIT = "EDIT";

export default {
  Mutation: {
    editUser: async (_, args, { request, isAuthenticated }) => {
      try {
        const {
          id,
          email,
          firstName,
          lastName,
          basePay,
          rank,
          department,
          address,
          addressDetail,
          birthDay,
          action
        } = args;

        if (action === EDIT) {
          let data = {};
          if (!!email) data.email = email;
          if (!!firstName) data.firstName = firstName;
          if (!!basePay) data.basePay = basePay;
          if (!!rank) {
            data.rank = {
              connect: {
                id: rank
              }
            };
          }
          if (!!department) {
            data.department = {
              connect: {
                id: department
              }
            };
          }
          if (!!address) {
            data.address = address;
          }
          if (!!addressDetail) {
            data.addressDetail = addressDetail;
          }
          if (!!lastName) data.lastName = lastName;
          if (!!birthDay) data.birthDay = new Date(birthDay);
          await prisma.updateUser({
            where: {
              id
            },
            data
          });
        } else if (action === DELETE) {
          await prisma.deleteUser({ id });
        }
        return true;
      } catch (error) {
        return false;
      }
    }
  }
};
