import jwt from "jsonwebtoken";

export const generateWebToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET);
