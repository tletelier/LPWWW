const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const {ApolloServer, gql} = require ('apollo-server-express');
// const {merge, unary} = require('lodash');

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

const typeDefs = gql`
scalar DateTime

type Admin {
  id: ID!
  nombres: String,
  apellidos: String,
  codigoAdmin: Int,
  pass: String,
}

type Sucursal {
  id: ID!
  direccion: String,
  codigoSucursal: Int,
}

type Cajero {
  id: ID!
  codigoCajero: Int!,
  pass: String!,
  nombres: String,
  apellidos: String,
  turno: String,
  sucursal: Sucursal,
}

type Funcionario {
  id: ID!
  nombres: String!,
  apellidos: String!,
  codigoFuncionario: Int!,
  correo: String!,
  pass: String!,
  perfil: String!,
  valesDisponibles: Int!,
  valesUtilizados: Int!,
  valesNoUtilizados: Int!,
  sucursal: Sucursal,
}

type Informe {
  id: ID!
  fecha: DateTime,
  cantidadValesUsados: Int,
  cantidadValesNoUsados: Int,
  autor: Admin,
  vale: Vale,
}

type Servicio {
  id: ID!
  horario: String,
  valor: Int,
  perfil: String,
}

type Vale {
  id: ID!
  fecha: DateTime!,
  servicio: Servicio,
  funcionario: Funcionario,
  cajero: Cajero,
  sucursal: Sucursal,
}

input FuncionarioInput{
  nombres: String!,
  apellidos: String!,
  codigoFuncionario: Int!,
  correo: String!,
  pass: String!,
  perfil: String!,
  valesDisponibles: Int!,
  valesUtilizados: Int!,
  valesNoUtilizados: Int!,
}

input ValeInput{
  fecha: DateTime!,
}

type Alert{
  message: String
}

type Query{
  getFuncionarios: [Funcionario]
  getFuncionario(id: ID!): Funcionario
  getVales: [Vale]
}

type Mutation{
  addFuncionario(input: FuncionarioInput): Funcionario
  updateFuncionario(id: ID!, input: FuncionarioInput) :  Funcionario
  deleteFuncionario(id: ID!) : Alert
  addVale(input: ValeInput): Vale
}
`;

const resolvers = {
  Query: {
    async getFuncionarios(obj){
      const funcionarios = await Funcionario.find();
      return funcionarios;
    },
    async getVales(obj){
      const vales = await Vale.find();
      return vales;
    },
    async getFuncionario(obj, {id}){
      const funcionario = await Funcionario.findById(id);
      return funcionario;
    }
  },
  Mutation: {
    async addFuncionario(obj, {input}){
      const funcionario = new Funcionario(input);
      await funcionario.save();
      return funcionario;
    },
    async updateFuncionario(obj, {id, input}){
      const funcionario = await Funcionario.findByIdAndUpdate(id, input);
      return funcionario;
    },
    async deleteFuncionario(obj, {id}){
      await Funcionario.deleteOne({_id: id});
      return{
        message:"Funcionario Eliminado" 
      }
    },
    async addVale(obj, {input}){
      const vale = new Vale(input);
      await vale.save();
      return vale;
    },
  }
}

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
app.listen(8090, function(){
  console.log("Servidor Iniciado");
})

