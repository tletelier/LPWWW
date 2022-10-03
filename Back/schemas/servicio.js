// Middleware
const auth = require("../middleware/auth");

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
}

input ServicioInput {
  nombre: String!
  horarioInicio: String!
  horarioFin: String!
  valor: Int!
  maxValesTurno: Int!
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
    async getServicios(obj){
      return await Servicio.find();
    },
    async getServicio(obj, {id}){
      return await Servicio.findById(id);
    }
  },
  Mutation: {
    async addServicio(obj, {input}){
      const temp = new Servicio(input);
      await temp.save();
      return temp;
    },
    async updateServicio(obj, {id, input}){
      return await Servicio.findByIdAndUpdate(id, input);
    },
    async deleteServicio(obj, {id}){
      await Servicio.deleteOne({_id: id});
      return{
        message:"Servicio Eliminado" 
      }
    }
  }
};

module.exports = { servicioSchema, servicioResolvers};