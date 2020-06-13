import express from "express";
import gql from "graphql-tag";
import { ApolloServer } from "apollo-server-express";
import { makeExecutableSchema } from "graphql-tools";
import resolvers from "./resolvers";
import types from "./types.graphql";

const schema = makeExecutableSchema({
  typeDefs: gql`
    ${types}
  `,
  resolvers,
});

const createServer = () => {
  const server = new ApolloServer({ schema });
  const app = express();
  server.applyMiddleware({ app });

  return app;
};

export default createServer;
