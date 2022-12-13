// Models
const Perfil = require('../models/perfil');

const perfilSchema = `

type Perfil {
  id: ID!
  nombre: String!
  servicios: [ID]
}

input PerfilInput {
  nombre: String
  servicios: [ID]
}

type Query{
  getPerfiles: [Perfil]
  getPerfil(id: ID!): Perfil
  getPerfilesServicio(servicioId: ID!) : [Perfil]
}

type Mutation{
  addPerfil(input: PerfilInput): Perfil
  addServicioPerfil(idServicio: ID, idPerfil: ID) : Perfil 
  updatePerfil(id: ID!, input: PerfilInput): Perfil
  deletePerfil(id: ID!): Alert
}
`;

const perfilResolvers = {
  Query: {
    async getPerfiles(obj, params, context, info){
      return await Perfil.find();
    },
    async getPerfil(obj, {id}, context, info){
      return await Perfil.findById(id);
    },
    async getPerfilesServicio(obj, {servicioId}, context, info){
      const perfiles = await Perfil.find();
      let response = [];

      for (var i=0; i < perfiles.length; i++) {
        if(perfiles[i].servicio == servicioId){
          response.push(perfiles[i]);
        }
      }

      return response;
    },
  },
  Mutation: {
    async addPerfil(obj, {input}, context, info){
      if (context.user === null || context.user.type !== "admin") return new Perfil({});
      const temp = new Perfil(input);
      await temp.save();
      return temp;
    },
    async addServicioPerfil(obj, {idServicio, idPerfil}, context, info){
      if (context.user === null || context.user.type !== "admin") return new Perfil({});
      let temp = await Perfil.findById(idPerfil);
      temp.servicios.push(idServicio);
      await temp.save();
      return temp;
    },
    async updatePerfil(obj, {id, input}, context, info){
      if (context.user === null || context.user.type !== "admin") return new Perfil({});
      return await Perfil.findByIdAndUpdate(id, input);
    },
    async deletePerfil(obj, {id}, context, info){
      if (context.user === null || context.user.type !== "admin") return {message:"No permissions"};
      await Perfil.deleteOne({_id: id});
      return{
        message:"Perfil Eliminado" 
      }
    }
  }
};

module.exports = { perfilSchema, perfilResolvers};