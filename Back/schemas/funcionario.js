const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Middleware
const auth = require("../middleware/auth");

// Models
const Funcionario = require('../models/funcionario');

const funcionarioSchema = `

type Funcionario {
  id: ID!
  nombres: String!
  apellidos: String!
  codigoFuncionario: Int!
  correo: String!
  pass: String!
  perfil: String!
  valesDisponibles: Int!
  valesUtilizados: Int!
  valesNoUtilizados: Int!
  sucursal: Sucursal
}

input FuncionarioInput{
  nombres: String!
  apellidos: String!
  codigoFuncionario: Int!
  correo: String!
  pass: String!
  perfil: String!
  valesDisponibles: Int!
  valesUtilizados: Int!
  valesNoUtilizados: Int!
}

type Query{
  getFuncionarios: [Funcionario]
  getFuncionario(id: ID!): Funcionario
}

type Mutation{
  addFuncionario(input: FuncionarioInput): Funcionario
  updateFuncionario(id: ID!, input: FuncionarioInput) :  Funcionario
  deleteFuncionario(id: ID!) : Alert
  loginFuncionario(email: String!, password: String!): Response
}
`;

const funcionarioResolvers = {
  Query: {
    async getFuncionarios(obj){
      return await Funcionario.find();
    },
    async getFuncionario(obj, {id}){
      return await Funcionario.findById(id);
    }
  },
  Mutation: {
    async addFuncionario(obj, {input}){
      let temp = new Funcionario(input);

      const password = await bcrypt.hash(input.password, 10);
      temp.password = password;

      await temp.save();
      return temp;
    },
    async updateFuncionario(obj, {id, input}){
      return await Funcionario.findByIdAndUpdate(id, input);
    },
    async deleteFuncionario(obj, {id}){
      await Funcionario.deleteOne({_id: id});
      return{
        message:"Funcionario Eliminado" 
      }
    },
    async loginFuncionario(obj, {email, password}){
      // Validate data
      if (!(email && password)) {
        return {
          message: "Missing data.",
          code: 400
        }
      }

      // Validate if register exist
      const funcionario = await Cajero.findOne({ "correo":email });

      // Get token
      if (funcionario && (await bcrypt.compare(password, funcionario.pass))) {
        
        const token = jwt.sign(
          { type: "funcionario", code: funcionario.codigoCajero },
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
    }
  }
};

module.exports = { funcionarioSchema, funcionarioResolvers};