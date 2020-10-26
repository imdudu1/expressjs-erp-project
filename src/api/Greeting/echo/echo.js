export default {
  Query: {
    echo: (_, args) => {
      const { message } = args;
      return message;
    },
  },
};
