import { prisma } from "../../../generated/prisma-client";

export default {
  User: {
    department: ({ id }) => prisma.user({ id }).department(),
    rank: ({ id }) => prisma.user({ id }).rank(),
    fullName: ({ firstName, lastName }) => `${firstName} ${lastName}`,
    age: ({ birthDay }) => {
      let today = new Date();
      let birthDate = new Date(birthDay);
      let age = today.getFullYear() - birthDate.getFullYear();
      let m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      return age;
    },
  },
};
