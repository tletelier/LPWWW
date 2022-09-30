// Middleware
const auth = require("../middleware/auth");

// Models
const Perfil = require('../models/perfil');

const perfilSchema = `

type Perfil {
  id: ID!
  nombre: String!
  cantidadTurno: Int!
  valor: Int!
}

input PerfilInput {
  nombre: String!
  cantidadTurno: Int!
  valor: Int!
}

type Query{
  getPerfiles: [Perfil]
  getPerfil(id: ID!): Perfil
}

type Mutation{
  addPerfil(input: PerfilInput): Perfil
  updatePerfil(id: ID!, input: PerfilInput): Perfil
  deletePerfil(id: ID!): Alert
}
`;

const sucursalResolvers = {
  Query: {
    async getPerfiles(obj){
      return await Perfil.find();
    },
    async getPerfil(obj, {id}){
      return await Perfil.findById(id);
    }
  },
  Mutation: {
    async addPerfil(obj, {input}){
      const temp = new Perfil(input);
      await temp.save();
      return temp;
    },
    async updatePerfil(obj, {id, input}){
      return await Perfil.findByIdAndUpdate(id, input);
    },
    async deletePerfil(obj, {id}){
      await Perfil.deleteOne({_id: id});
      return{
        message:"Perfil Eliminado" 
      }
    }
  }
};

module.exports = { perfilSchema, perfilResolvers};