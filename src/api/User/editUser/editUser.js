import * as argon2 from "argon2";
import { prisma } from "../../../../generated/prisma-client";

const DELETE = "DELETE";
const EDIT = "EDIT";

export default {
  Mutation: {
    editUser: async (_, args, { request, isAuthenticated }) => {
      try {
        const user = await isAuthenticated(request);
        const {
          email,
          newPassword,
          confirmPassword,
          firstName,
          lastName,
          birthDay,
          action,
        } = args;

        const isValid = await argon2.verify(user.password, confirmPassword);
        if (isValid) {
          if (action === EDIT) {
            let data = {};
            if (!!email) data.email = email;
            if (!!newPassword) data.password = await argon2.hash(newPassword);
            if (!!firstName) data.firstName = firstName;
            if (!!lastName) data.lastName = lastName;
            if (!!birthDay) data.birthDay = new Date(birthDay);
            await prisma.updateUser({
              where: {
                id: user.id,
              },
              data,
            });
          } else if (action === DELETE) {
            await prisma.deleteUser({ id: user.id });
          }
          return true;
        } else {
          return false;
        }
      } catch (error) {
        return false;
      }
    },
  },
};
