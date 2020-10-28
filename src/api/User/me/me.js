export default {
  Query: {
    // @TODO Remove password entry
    me: async (_, args, { request, isAuthenticated }) =>
      isAuthenticated(request),
  },
};
