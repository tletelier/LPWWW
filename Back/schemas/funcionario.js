const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fs = require('fs');
const dotenv = require('dotenv')
const cron = require('node-cron');
dotenv.config();

// Models
const Funcionario = require('../models/funcionario');

// Mailer
const nodemailer = require('nodemailer');

const emailTemplate =  fs.readFileSync('./assets/email/index.html').toString();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

String.format = function() {
  var s = arguments[0];
  for (var i = 0; i < arguments.length - 1; i += 1) {
      var reg = new RegExp('\\{' + i + '\\}', 'gm');
      s = s.replace(reg, arguments[i + 1]);
  }
  return s;
};

cron.schedule('5 8 * * Sun', async () => { //cada semana, lo enviara a las 8:05 de Sunday
  const funcionarios = await Funcionario.find();
  for (var i = 0; i < funcionarios.length; i++){
    try {
      transporter.sendMail({
        from: 'librosImpresos-ServicioCasino.cl',
        to: funcionarios[i].correo,
        subject: 'Aviso Semanal Vales', // Subject
        html: String.format(emailTemplate, 
                            funcionarios[i].valesDisponibles, 
                            funcionarios[i].valesUtilizados, 
                            funcionarios[i].valesNoUtilizados),
      });
      console.log('Ok');
    }
    catch (e) {
      console.log(e);
    }
  }
});

const funcionarioSchema = `

type Funcionario {
  id: ID!
  nombres: String!
  apellidos: String!
  codigoFuncionario: Int!
  correo: String!
  password: String!
  perfil: ID!
  valesDisponibles: Int!
  valesUtilizados: Int!
  valesNoUtilizados: Int!
}

input FuncionarioInput{
  nombres: String
  apellidos: String
  codigoFuncionario: Int
  correo: String
  password: String
  perfil: ID
  valesDisponibles: Int
  valesUtilizados: Int
  valesNoUtilizados: Int
}

type Query{
  getFuncionarios: [Funcionario]
  getFuncionario(id: ID!): Funcionario
}

type Mutation{
  addFuncionario(input: FuncionarioInput): Funcionario
  updateFuncionario(id: ID!, input: FuncionarioInput) :  Funcionario
  deleteFuncionario(id: ID!) : Alert
  loginFuncionario(codigoFuncionario: String!, password: String!): Response
}
`;

const funcionarioResolvers = {
  Query: {
    async getFuncionarios(obj, params, context, info){
      const funcionarios = await Funcionario.find();
      // console.log(funcionarios);
      return funcionarios;
    },
    async getFuncionario(obj, {id}, context, info){
      return await Funcionario.findById(id);
    },
  },
  Mutation: {
    async addFuncionario(obj, {input}, context, info){
      if (context.user === null || context.user.type !== "admin") return new Funcionario({});
      let temp = new Funcionario(input);

      const password = await bcrypt.hash(input.password, 10);
      temp.password = password;

      await temp.save();
      return temp;
    },
    async updateFuncionario(obj, {id, input}, context, info){
      if (context.user === null || context.user.type !== "admin") return new Funcionario({});
      return await Funcionario.findByIdAndUpdate(id, input);
    },
    async deleteFuncionario(obj, {id}, context, info){
      if (context.user === null || context.user.type !== "admin") return {message: "No permissions"};
      await Funcionario.deleteOne({_id: id});
      return{
        message:"Funcionario Eliminado" 
      }
    },
    async loginFuncionario(obj, {codigoFuncionario, password}, context, info){
      // Validate data
      if (!(codigoFuncionario && password)) {
        return {
          message: "Missing data.",
          code: 400
        }
      }

      // Validate if register exist
      const funcionario = await Cajero.findOne({ "codigoFuncionario":codigoFuncionario });

      // Get token
      if (funcionario && (await bcrypt.compare(password, funcionario.pass))) {
        
        const token = jwt.sign(
          { type: "funcionario", code: funcionario.codigoFuncionario },
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