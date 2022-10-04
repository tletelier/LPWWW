// Middleware
const auth = require("../middleware/auth");

// Models
const Vale = require('../models/vale');
const Funcionario = require('../models/funcionario');

const valeSchema = `

type Vale {
  id: ID!
  fecha: DateTime
  saldo: Int!
  estado: Int!
  funcionario: Funcionario
  cajero: Cajero
  sucursal: Sucursal
  perfilName: String!
  servicioName: String!
}

input ValeInput {
  fecha: DateTime
  saldo: Int!
  funcionario: ID!
  cajero: ID!
  sucursal: ID!
  perfilName: String!
  servicioName: String!
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
    async addVale(obj, {input}){

      input.estado = 0;
      const temp = new Vale(input);
      await temp.save();

      await Funcionario.updateOne(
        {_id: input.funcionario},
        {$inc: {valesNoUtilizados: 1, valesDisponibles: -1}}
      )

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