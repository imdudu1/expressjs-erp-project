import { makeExecutableSchema } from "apollo-server";
import { loadFilesSync, mergeResolvers, mergeTypeDefs } from "graphql-tools";
import path from "path";

const allTypes = loadFilesSync(path.join(__dirname, "/api/**/*.graphql"));
const allResolvers = loadFilesSync(path.join(__dirname, "/api/**/*.js"));

const schema = makeExecutableSchema({
  typeDefs: mergeTypeDefs(allTypes),
  resolvers: mergeResolvers(allResolvers),
});

export default schema;
