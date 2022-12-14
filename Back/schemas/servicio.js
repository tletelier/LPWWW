// Middleware
const auth = require("../middleware/auth");
const Perfil = require("../models/perfil");

// Models
const Servicio = require('../models/servicio');

const servicioSchema = `

type Servicio {
  id: ID!
  nombre: String!
  horarioInicio: String!
  horarioFin: String!
  valor: Int!
  maxValesTurno: Int!
  perfil: ID!
}

input ServicioInput {
  nombre: String
  horarioInicio: String
  horarioFin: String
  valor: Int
  maxValesTurno: Int
  perfil: ID
}

type Query{
  getServicios: [Servicio]
  getServicio(id: ID!): Servicio
}

type Mutation{
  addServicio(input: ServicioInput): Servicio
  updateServicio(id: ID!, input: ServicioInput): Servicio
  deleteServicio(id: ID!): Alert
}
`;

const servicioResolvers = {
  Query: {
    async getServicios(obj, params, context, info){
      return await Servicio.find();
    },
    async getServicio(obj, {id}, context, info){
      const temp = Servicio.findById(id)
      console.log(temp);
      return await Servicio.findById(id)
    }
  },
  Mutation: {
    async addServicio(obj, {input}, context, info){
      if (context.user === null || context.user.type !== "admin") return new Servicio({});
      let {nombre, horarioInicio, horarioFin, valor, maxValesTurno, perfil} = input
      let perfilBuscar = await Perfil.findById(perfil)
      if(perfilBuscar === null){
        return null
      } else {
        const servicio = new Servicio(
          {
          nombre: nombre, 
          horarioInicio: horarioInicio, 
          horarioFin: horarioFin, 
          valor: valor, 
          maxValesTurno: maxValesTurno, 
          perfil: perfilBuscar._id
        })
        await servicio.save();
        return servicio;
      }
    },
    async updateServicio(obj, {id, input}, context, info){
      if (context.user === null || context.user.type !== "admin") return new Servicio({});
      return await Servicio.findByIdAndUpdate(id, input);
    },
    async deleteServicio(obj, {id}, context, info){
      if (context.user === null || context.user.type !== "admin") return {message: "No permissions"};
      await Servicio.deleteOne({_id: id});
      return{
        message:"Servicio Eliminado" 
      }
    }
  }
};

module.exports = { servicioSchema, servicioResolvers};