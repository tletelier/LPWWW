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
  password: String!
  codigoCajero: Int!
  sucursal: ID!
}

input CajeroInput {
  nombres: String!
  apellidos: String!
  password: String!
  codigoCajero: Int!
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
  loginCajero(codigoCajero: String!, password: String!): Response
}
`;

const cajeroResolvers = {
  Query: {
    async getCajeros(obj){
      return await Cajero.find().populate('sucursal');
    },
    async getCajero(obj, {id}){
      return await Cajero.findById(id).populate('sucursal');
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
    async loginCajero(obj, {codigoCajero, password}){
      // Validate data
      if (!(codigoCajero && password)) {
        return {
          message: "Missing data.",
          code: 400
        }
      }

      // Validate if register exist
      const cajero = await Cajero.findOne({ "codigoCajero":codigoCajero });

      // Get token
      if (cajero && (await bcrypt.compare(password, cajero.password))) {
        
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