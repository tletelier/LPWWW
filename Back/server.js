const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const {ApolloServer, gql} = require ('apollo-server-express');
const {ApolloServerPluginLandingPageLocalDefault,} = require('apollo-server-core');

const { GraphQLScalarType, Kind } = require('graphql');
//const { typeDefs } = require('./schema.js')
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// const {merge, unary} = require('lodash');

// Middleware
const auth = require("./middleware/auth");

// Models
const Admin = require('./models/admin');
const Cajero = require('./models/cajero');
const Funcionario = require('./models/funcionario');
const Informe = require('./models/informe');
const Servicio = require('./models/servicio');
const Sucursal = require('./models/sucursal');
const Vale = require('./models/vale');

// Variables de entorno
const dotenv = require('dotenv')
dotenv.config();

const URI = process.env.MONGO_URI;

mongoose.connect(URI, {
  useNewUrlParser: true, 
  useUnifiedTopology: true
  }, err => {
    if(err) throw err;
    console.log('Connected to MongoDB!!!')
  });

let apolloServer = null;

const corsOptions = {
  origin: process.env.SERVER_PORT,
  credentials: false
};

async function startServer(){
  const apolloServer = new ApolloServer({typeDefs, resolvers, corsOptions});
  await apolloServer.start();
  apolloServer.applyMiddleware({app, cors:false});
}

startServer();

const app = express();

app.use(cors());
app.use(express.json());

app.listen(8090, function(){
  console.log("Servidor Iniciado");
})

