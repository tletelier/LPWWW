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

const typeDefs = gql`
scalar DateTime

type Admin {
  id: ID!
  nombres: String!
  apellidos: String!
  codigoAdmin: Int!
  pass: String!
}

type Sucursal {
  id: ID!
  direccion: String!
  codigoSucursal: Int!
}

type Cajero {
  id: ID!
  nombres: String!
  apellidos: String!
  turno: String!
  sucursal: Sucursal
}

type Funcionario {
  id: ID!
  nombres: String!
  apellidos: String!
  codigoFuncionario: Int!
  correo: String!
  pass: String!
  perfil: String!
  valesDisponibles: Int!
  valesUtilizados: Int!
  valesNoUtilizados: Int!
  sucursal: Sucursal
}

type Vale {
  id: ID!
  fecha: DateTime
  servicio: Servicio
  funcionario: Funcionario
  cajero: Cajero
  sucursal: Sucursal
}

type Informe {
  id: ID!
  fecha: DateTime
  cantidadValesUsados: Int!
  cantidadValesNoUsados: Int!
  autor: Admin
  vale: Vale
}

type Servicio {
  id: ID!
  horario: String!
  valor: Int!
  perfil: String!
}

type Alert{
  message: String!
}

type Response{
  message: String
  token: String
  code: Int!
}

input AdminInput{
  nombres: String!
  apellidos: String!
  codigoAdmin: Int!
  pass: String!
}

input SucursalInput {
  id: ID!
  direccion: String!
  codigoSucursal: Int!
}

input CajeroInput {
  id: ID!
  nombres: String!
  apellidos: String!
  turno: String!
  sucursal: String!
}

input FuncionarioInput{
  nombres: String!
  apellidos: String!
  codigoFuncionario: Int!
  correo: String!
  pass: String!
  perfil: String!
  valesDisponibles: Int!
  valesUtilizados: Int!
  valesNoUtilizados: Int!
}

input ValeInput {
  id: ID!
  fecha: DateTime
  servicio: String!
  funcionario: String!
  cajero: String!
  sucursal: String!
}

input InformeInput {
  id: ID!
  fecha: DateTime
  cantidadValesUsados: Int!
  cantidadValesNoUsados: Int!
  autor: String!
  vale: String!
}

input ServicioInput {
  id: ID!
  horario: String!
  valor: Int!
  perfil: String!
}

type Query{
  getAdmins : [Admin]
  getAdmin(id: ID!) : Admin

  getCajeros: [Cajero]
  getCajero(id: ID!): Cajero

  getFuncionarios: [Funcionario]
  getFuncionario(id: ID!): Funcionario
  
  getInformes: [Informe]
  getInforme(id: ID!): Informe

  getServicios: [Servicio]
  getServicio(id: ID!): Servicio

  getSucursals: [Sucursal]
  getSucursal(id: ID!): Sucursal

  getVales: [Vale]
  getVale(id: ID!): Vale
}

type Mutation{
  addAdmin(input: AdminInput): Admin
  updateAdmin(id: ID!, input: AdminInput): Admin
  deleteAdmin(id: ID!): Alert
  loginAdmin(email: String!, password: String!): Response

  addCajero(input: CajeroInput): Cajero
  updateCajero(id: ID!, input: CajeroInput): Cajero
  deleteCajero(id: ID!): Alert
  loginCajero(email: String!, password: String!): Response

  addFuncionario(input: FuncionarioInput): Funcionario
  updateFuncionario(id: ID!, input: FuncionarioInput) :  Funcionario
  deleteFuncionario(id: ID!) : Alert
  loginFuncionario(email: String!, password: String!): Response

  addInforme(input: InformeInput): Informe
  updateInforme(id: ID!, input: InformeInput): Informe
  deleteInforme(id: ID!): Alert

  addServicio(input: ServicioInput): Servicio
  updateServicio(id: ID!, input: ServicioInput): Servicio
  deleteServicio(id: ID!): Alert

  addSucursal(input: SucursalInput): Sucursal
  updateSucursal(id: ID!, input: SucursalInput): Sucursal
  deleteSucursal(id: ID!): Alert

  addVale(input: ValeInput): Vale
  updateVale(id: ID!, input: ValeInput): Vale
  deleteVale(id: ID!): Alert
}
`;

const resolvers = {
  Query: {

    async getAdmins(obj){
      return await Admin.find();
    },
    async getAdmin(obj, {id}){
      return await Admin.findById(id);
    },
    async getCajeros(obj){
      return await Cajero.find();
    },
    async getCajero(obj, {id}){
      return await Cajero.findById(id);
    },
    async getFuncionarios(obj){
      return await Funcionario.find();
    },
    async getFuncionario(obj, {id}){
      return await Funcionario.findById(id);
    },
    async getInformes(obj){
      return await Informe.find();
    },
    async getInforme(obj, {id}){
      return await Informe.findById(id);
    },
    async getServicios(obj){
      return await Servicio.find();
    },
    async getServicio(obj, {id}){
      return await Servicio.findById(id);
    },
    async getSucursals(obj){
      return await Sucursal.find();
    },
    async getSucursal(obj, {id}){
      return await Sucursal.findById(id);
    },
    async getVales(obj){
      return await Vale.find();
    },
    async getVale(obj, {id}){
      return await Vale.findById(id);
    }
  },
  Mutation: {
    async addAdmin(obj, {input}){
      let temp = new Admin(input);

      const password = await bcrypt.hash(input.password, 10);
      temp.password = password;

      await temp.save();
      return temp;
    },
    async updateAdmin(obj, {id, input}){
      return await Admin.findByIdAndUpdate(id, input);
    },
    async deleteAdmin(obj, {id}){
      await Admin.deleteOne({_id: id});
      return{
        message:"Admin Eliminado" 
      }
    },
    async loginAdmin(obj, {email, password}){
      // Validate data
      if (!(email && password)) {
        return {
          message: "Missing data.",
          code: 400
        }
      }

      // Validate if register exist
      const admin = await Admin.findOne({ "correo":email });

      // Get token
      if (admin && (await bcrypt.compare(password, admin.pass))) {
        
        const token = jwt.sign(
          { type: "admin", code: admin.codigoAdmin },
          process.env.TOKEN_KEY,
          {
            expiresIn: "3h",
          }
        );

        admin.token = token;

        // Return token
        return {
          message: "Logged.",
          token: token,
          code: 200
        }
      }
      return {
        message: "Invalid email or password",
        code: 400
      }
    },



    async addCajero(obj, {input}){
      let temp = new Cajero(input);

      const password = await bcrypt.hash(input.password, 10);
      temp.password = password;

      await temp.save();
      return temp;
    },
    async updateCajero(obj, {id, input}){
      return await Cajero.findByIdAndUpdate(id, input);
    },
    async deleteCajero(obj, {id}){
      await Cajero.deleteOne({_id: id});
      return{
        message:"Cajero Eliminado" 
      }
    },
    async loginCajero(obj, {email, password}){
      // Validate data
      if (!(email && password)) {
        return {
          message: "Missing data.",
          code: 400
        }
      }

      // Validate if register exist
      const cajero = await Cajero.findOne({ "correo":email });

      // Get token
      if (cajero && (await bcrypt.compare(password, cajero.pass))) {
        
        const token = jwt.sign(
          { type: "cajero", code: cajero.codigoCajero },
          process.env.TOKEN_KEY,
          {
            expiresIn: "3h",
          }
        );

        cajero.token = token;

        // Return token
        return {
          message: "Logged.",
          token: token,
          code: 200
        }
      }
      return {
        message: "Invalid email or password",
        code: 400
      }
    },



    async addFuncionario(obj, {input}){
      let temp = new Funcionario(input);

      const password = await bcrypt.hash(input.password, 10);
      temp.password = password;

      await temp.save();
      return temp;
    },
    async updateFuncionario(obj, {id, input}){
      return await Funcionario.findByIdAndUpdate(id, input);
    },
    async deleteFuncionario(obj, {id}){
      await Funcionario.deleteOne({_id: id});
      return{
        message:"Funcionario Eliminado" 
      }
    },
    async loginFuncionario(obj, {email, password}){
      // Validate data
      if (!(email && password)) {
        return {
          message: "Missing data.",
          code: 400
        }
      }

      // Validate if register exist
      const funcionario = await Cajero.findOne({ "correo":email });

      // Get token
      if (funcionario && (await bcrypt.compare(password, funcionario.pass))) {
        
        const token = jwt.sign(
          { type: "funcionario", code: funcionario.codigoCajero },
          process.env.TOKEN_KEY,
          {
            expiresIn: "3h",
          }
        );

        cajero.token = token;

        // Return token
        return {
          message: "Logged.",
          token: token,
          code: 200
        }
      }
      return {
        message: "Invalid email or password",
        code: 400
      }
    },


    async addInforme(obj, {input}){
      const temp = new Informe(input);
      await temp.save();
      return temp;
    },
    async updateInforme(obj, {id, input}){
      return await Informe.findByIdAndUpdate(id, input);
    },
    async deleteInforme(obj, {id}){
      await Informe.deleteOne({_id: id});
      return{
        message:"Informe Eliminado" 
      }
    },
    async addServicio(obj, {input}){
      const temp = new Servicio(input);
      await temp.save();
      return temp;
    },
    async updateServicio(obj, {id, input}){
      return await Servicio.findByIdAndUpdate(id, input);
    },
    async deleteServicio(obj, {id}){
      await Servicio.deleteOne({_id: id});
      return{
        message:"Servicio Eliminado" 
      }
    },
    async addSucursal(obj, {input}){
      const temp = new Sucursal(input);
      await temp.save();
      return temp;
    },
    async updateSucursal(obj, {id, input}){
      return await Sucursal.findByIdAndUpdate(id, input);
    },
    async deleteSucursal(obj, {id}){
      await Sucursal.deleteOne({_id: id});
      return{
        message:"Sucursal Eliminado" 
      }
    },
    async addVale(obj, {input}){
      const temp = new Vale(input);
      await temp.save();
      return temp;
    },
    async updateVale(obj, {id, input}){
      return await Vale.findByIdAndUpdate(id, input);
    },
    async deleteVale(obj, {id}){
      await Vale.deleteOne({_id: id});
      return{
        message:"Vale Eliminado" 
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
app.use(express.json());

app.listen(8090, function(){
  console.log("Servidor Iniciado");
})

