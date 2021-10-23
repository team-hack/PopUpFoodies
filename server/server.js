require('dotenv').config({ path: '../.env', debug: process.env.DEBUG });
const { port } = process.env;
const { ApolloServer } = require('apollo-server-express');
const { ApolloServerPluginDrainHttpServer } = require("apollo-server-core");
const express = require('express');
const http = require('http');

const typeDefs = require('./schema');
const resolvers = require('./resolver');

async function startApolloServer(typeDefs, resolvers){
  const app = express();
  const httpServer = http.createServer(app);
  const server = new ApolloServer({typeDefs, resolvers, Plugins:[ApolloServerPluginDrainHttpServer]});
  await server.start();
  server.applyMiddleware({app});
  await new Promise(resolve => httpServer.listen({port}, resolve));
  console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`);
}

startApolloServer(typeDefs, resolvers);