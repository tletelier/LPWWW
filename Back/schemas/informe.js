// Middleware
const auth = require("../middleware/auth");

// Models
const Informe = require('../models/informe');

const informeSchema = `

type Informe {
  id: ID!
  fecha: DateTime
  cantidadValesUsados: Int!
  cantidadValesNoUsados: Int!
  autor: Admin
  vale: Vale
}

input InformeInput {
  fecha: DateTime
  cantidadValesUsados: Int!
  cantidadValesNoUsados: Int!
  autor: String!
  vale: String!
}

type Query{
  getInformes: [Informe]
  getInforme(id: ID!): Informe
}

type Mutation{
  addInforme(input: InformeInput): Informe
  updateInforme(id: ID!, input: InformeInput): Informe
  deleteInforme(id: ID!): Alert
}
`;

const informeResolvers = {
  Query: {
    async getInformes(obj){
      return await Informe.find();
    },
    async getInforme(obj, {id}){
      return await Informe.findById(id);
    }
  },
  Mutation: {
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
    }
  }
};

module.exports = { informeSchema, informeResolvers};