export default {
  Mutation: {
    createCommuteTime: async (_, args, { request, isAuthenticated }) => {
      const user = await isAuthenticated(request);
      const { startDate, endDate } = args;
      let start = new Date(startDate);
      let end = new Date(endDate);
      let workTime = (end.getTime() - start.getTime()) / (1000 * 60 * 60);
      let pay = workTime * process.env.MINIMUM_WAGE;
    },
  },
};
