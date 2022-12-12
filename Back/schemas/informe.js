// Models
const Informe = require('../models/informe');

const informeSchema = `

type Informe {
  id: ID!
  fecha: DateTime!
  cantidadValesUsados: Int!
  cantidadValesNoUsados: Int!
  autor: ID!
  vale: [ID]
}

input InformeInput {
  fecha: DateTime!
  cantidadValesUsados: Int!
  cantidadValesNoUsados: Int!
  autor: ID!
  vale: [ID]
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
    async getInformes(obj, args, context, info){
      return await Informe.find().populate('admin').populate(
        { path: 'vales', populate: { path: 'vale' } });
    },
    async getInforme(obj, {id}, context, info){
      return await Informe.findById(id).populate('admin').populate(
        { path: 'vales', populate: { path: 'vale' } });
    }
  },
  Mutation: {
    async addInforme(obj, {input}, context, info){
      if (context.user === null || context.user.type !== "admin") return new Informe({});
      const temp = new Informe(input);
      await temp.save();
      return temp;
    },
    async updateInforme(obj, {id, input}, context, info){
      if (context.user === null || context.user.type !== "admin") return new Informe({});
      return await Informe.findByIdAndUpdate(id, input);
    },
    async deleteInforme(obj, {id}, context, info){
      await Informe.deleteOne({_id: id});
      return{
        message:"Informe Eliminado" 
      }
    }
  }
};

module.exports = { informeSchema, informeResolvers};