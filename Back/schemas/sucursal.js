// Middleware
const auth = require("../middleware/auth");

// Models
const Sucursal = require('../models/sucursal');

const sucursalSchema = `

type Sucursal {
  id: ID!
  direccion: String!
  codigoSucursal: Int!
  cajero: ID
}

input SucursalInput {
  direccion: String!
  codigoSucursal: Int!
  cajero: ID
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
    async getSucursales(obj, params, context, info){
      return await Sucursal.find();
    },
    async getSucursal(obj, {id}, context, info){
      return await Sucursal.findById(id);
    }
  },
  Mutation: {
    async addSucursal(obj, {input}, context, info){
      if (context.user === null || context.user.type !== "admin") return new Cajero({});
      const temp = new Sucursal(input);
      await temp.save();
      return temp;
    },
    async updateSucursal(obj, {id, input}, context, info){
      if (context.user === null || context.user.type !== "admin") return new Cajero({});
      return await Sucursal.findByIdAndUpdate(id, input);
    },
    async deleteSucursal(obj, {id}, context, info){
      if (context.user === null || context.user.type !== "admin") return {message: "No permissions"};
      await Sucursal.deleteOne({_id: id});
      return{
        message:"Sucursal Eliminado" 
      }
    }
  }
};

module.exports = { sucursalSchema, sucursalResolvers};