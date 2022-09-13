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
  nombres: String!,
  apellidos: String!,
  codigoAdmin: Int!,
  pass: String!,
}

type Sucursal {
  id: ID!
  direccion: String!,
  codigoSucursal: Int!,
}

type Cajero {
  id: ID!
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
  tipo: String!,
  horario: String!,
  valor: Int!,
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

input AdminInput{
  nombres: String!,
  apellidos: String!,
  codigoAdmin: Int!,
  pass: String!,
}

input ServicioInput{
  tipo: String!,
  horario: String!,
  valor: Int!,
}

input SucursalInput{
  direccion: String!,
  codigoSucursal: Int!,
}

type Alert{
  message: String
}

type Query{
  getFuncionarios: [Funcionario]
  getFuncionario(id: ID!): Funcionario
  getVales: [Vale]
  getAdmins: [Admin]
  getAdmin(id:ID!): Admin
  getServicios: [Servicio]
  getServicio(id:ID!): Servicio
  getSucursales: [Sucursal]
  getSucursal(id:ID!): Sucursal
}

type Mutation{
  addFuncionario(input: FuncionarioInput): Funcionario
  updateFuncionario(id: ID!, input: FuncionarioInput) :  Funcionario
  deleteFuncionario(id: ID!) : Alert
  addVale(input: ValeInput): Vale
  addAdmin(input:AdminInput): Admin
  updateAdmin(id:ID!,input: AdminInput): Admin
  deleteAdmin(id:ID!): Alert
  addServicio(input: ServicioInput): Servicio
  updateServicio(id:ID!,input: ServicioInput): Servicio
  deleteServicio(id:ID!): Alert
  addSucursal(input:SucursalInput): Sucursal
  updateSucursal(id:ID!,input:SucursalInput): Sucursal
  deleteSucursal(id:ID!): Alert
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
    async getAdmins(obj){
      const admins = await Admin.find();
      return admins;
    },
    async getServicios(obj){
      const servicios = await Servicio.find();
      return servicios;
    },
    async getSucursales(obj){
      const sucursales = await Sucursal.find();
      return sucursales;
    },
    async getFuncionario(obj, {id}){
      const funcionario = await Funcionario.findById(id);
      return funcionario;
    },
    async getAdmin(obj, {id}){
      const admin = await Admin.findById(id);
      return admin;
    },
    async getServicio(obj, {id}){
      const servicio = await Servicio.findById(id);
      return servicio;
    },
    async getSucursal(obj, {id}){
      const sucursal = await Sucursal.findById(id);
      return sucursal;
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
    async addAdmin(obj, {input}){
      const admin = new Admin(input);
      await admin.save();
      return admin;
    },
    async updateAdmin(obj, {id, input}){
      const admin = await Admin.findByIdAndUpdate(id, input);
      return admin;
    },
    async deleteAdmin(obj, {id}){
      await Admin.deleteOne({_id: id});
      return{
        message:"Admin Eliminado" 
      }
    },
    async addServicio(obj, {input}){
      const servicio = new Servicio(input);
      await servicio.save();
      return servicio;
    },
    async updateServicio(obj, {id, input}){
      const servicio = await Servicio.findByIdAndUpdate(id, input);
      return servicio;
    },
    async deleteServicio(obj, {id}){
      await Servicio.deleteOne({_id: id});
      return{
        message:"Servicio Eliminado" 
      }
    },
    async addSucursal(obj, {input}){
      const sucursal = new Sucursal(input);
      await sucursal.save();
      return sucursal;
    },
    async updateSucursal(obj, {id, input}){
      const sucursal = await Sucursal.findByIdAndUpdate(id, input);
      return sucursal;
    },
    async deleteSucursal(obj, {id}){
      await Sucursal.deleteOne({_id: id});
      return{
        message:"Sucursal Eliminada" 
      }
    }
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

