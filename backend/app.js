const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const cors = require('cors');
const app = express();
const { typeDefs } = require("./typeDefs");
const { resolvers } = require("./resolver");


module.exports = app;

app.use(cors({
  origin: 'http://localhost:5173', // Cambia esto si tu aplicación React está en otro puerto
}));


app.get("/", (req, res) => res.send("Bienvenido Rocket Code!"));

async function start() {
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await apolloServer.start();

  apolloServer.applyMiddleware({ app });

  app.use("*", (req, res) => res.status(404).send("Not Found"));

  app.listen(3000, () => {
    console.log("server on port", 3000);
  });
}

start();
