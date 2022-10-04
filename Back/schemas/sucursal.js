// Middleware
const auth = require("../middleware/auth");

// Models
const Sucursal = require('../models/sucursal');

const sucursalSchema = `

type Sucursal {
  id: ID!
  direccion: String!
  codigoSucursal: Int!
  cajero: Cajero
}

input SucursalInput {
  direccion: String!
  codigoSucursal: Int!
  cajero: String
}

type Query{
  getSucursales: [Sucursal]
  getSucursal(id: ID!): Sucursal
}

type Mutation{
  addSucursal(input: SucursalInput): Sucursal
  updateSucursal(id: ID!, input: SucursalInput): Sucursal
  deleteSucursal(id: ID!): Alert
}
`;

const sucursalResolvers = {
  Query: {
    async getSucursales(obj){
      return await Sucursal.find();
    },
    async getSucursal(obj, {id}){
      return await Sucursal.findById(id);
    }
  },
  Mutation: {
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
    }
  }
};

module.exports = { sucursalSchema, sucursalResolvers};