const fs = require("fs");
const path = require("path");
const { ApolloServer } = require("apollo-server-express");
const { importSchema } = require("graphql-import");
const MigrationApi = require("./MigrationApi");
const resolvers = require("./resolvers");

const schema = fs.readFileSync(
  path.join(__dirname, "./schema.graphql"),
  "utf8"
);
const typeDefs = importSchema(schema);

const server = new ApolloServer({
  playground: true,
  dataSources: () => {
    return {
      MigrationApi: new MigrationApi(),
    };
  },
  typeDefs,
  resolvers,
});

module.exports = server;
