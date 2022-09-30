const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Middleware
const auth = require("../middleware/auth");

// Models
const Cajero = require('../models/cajero');

const cajeroSchema = `

type Cajero {
  id: ID!
  nombres: String!
  apellidos: String!
  correo: String!
  pass: String!
  codigoCajero: Int!
  turno: String!
  sucursal: ID!
}

input CajeroInput {
  nombres: String!
  apellidos: String!
  correo: String!
  pass: String!
  codigoCajero: Int!
  turno: String!
  sucursal: ID!
}

type Query{
  getCajeros: [Cajero]
  getCajero(id: ID!): Cajero
}

type Mutation{
  addCajero(input: CajeroInput): Cajero
  updateCajero(id: ID!, input: CajeroInput): Cajero
  deleteCajero(id: ID!): Alert
  loginCajero(email: String!, password: String!): Response
}
`;

const cajeroResolvers = {
  Query: {
    async getCajeros(obj){
      return await Cajero.find();
    },
    async getCajero(obj, {id}){
      return await Cajero.findById(id);
    }
  },
  Mutation: {
    async addCajero(obj, {input}){
      let temp = new Cajero(input);

      const password = await bcrypt.hash(input.password, 10);
      temp.password = password;

      await temp.save();
      return temp;
    },
    async updateCajero(obj, {id, input}){
      return await Cajero.findByIdAndUpdate(id, input);
    },
    async deleteCajero(obj, {id}){
      await Cajero.deleteOne({_id: id});
      return{
        message:"Cajero Eliminado" 
      }
    },
    async loginCajero(obj, {email, password}){
      // Validate data
      if (!(email && password)) {
        return {
          message: "Missing data.",
          code: 400
        }
      }

      // Validate if register exist
      const cajero = await Cajero.findOne({ "correo":email });

      // Get token
      if (cajero && (await bcrypt.compare(password, cajero.pass))) {
        
        const token = jwt.sign(
          { type: "cajero", code: cajero.codigoCajero },
          process.env.TOKEN_KEY,
          {
            expiresIn: "3h",
          }
        );

        cajero.token = token;

        // Return token
        return {
          message: "Logged.",
          token: token,
          code: 200
        }
      }
      return {
        message: "Invalid email or password",
        code: 400
      }
    },
  }
};

module.exports = { cajeroSchema, cajeroResolvers};