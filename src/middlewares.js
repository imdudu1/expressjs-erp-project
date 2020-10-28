export const isAuthenticated = (req) => {
  if (!!req.userId) {
    return req.userId;
  } else {
    throw Error("You need to login first.");
  }
};
