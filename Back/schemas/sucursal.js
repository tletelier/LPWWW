// Middleware
const auth = require("../middleware/auth");

// Models
const Sucursal = require('../models/sucursal');

const SucursalSchema = `

type Sucursal {
  id: ID!
  direccion: String!
  codigoSucursal: Int!
}

input SucursalInput {
  id: ID!
  direccion: String!
  codigoSucursal: Int!
}

type Query{
  getSucursals: [Sucursal]
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
    async getSucursals(obj){
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

module.exports = { SucursalSchema, sucursalResolvers};