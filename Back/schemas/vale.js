// Middleware
const auth = require("../middleware/auth");

// Models
const Vale = require('../models/vale');

const valeSchema = `

type Vale {
  id: ID!
  fecha: DateTime
  servicio: Servicio
  funcionario: Funcionario
  cajero: Cajero
  sucursal: Sucursal
}

input ValeInput {
  id: ID!
  fecha: DateTime
  servicio: String!
  funcionario: String!
  cajero: String!
  sucursal: String!
}

type Query{

  getVales: [Vale]
  getVale(id: ID!): Vale
}

type Mutation{

  addVale(input: ValeInput): Vale
  updateVale(id: ID!, input: ValeInput): Vale
  deleteVale(id: ID!): Alert
}
`;

const valeResolvers = {
  Query: {

    async getVales(obj){
      return await Vale.find();
    },
    async getVale(obj, {id}){
      return await Vale.findById(id);
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
};

module.exports = { valeSchema, valeResolvers};