const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Middleware
const auth = require("../middleware/auth");

// Models
const Admin = require('../models/admin');

const adminSchema = `

 type Admin {
  id: ID!
  nombres: String!
  apellidos: String!
  codigoAdmin: Int!
  password: String!
}

input AdminInput{
  nombres: String!
  apellidos: String!
  codigoAdmin: Int!
  password: String!
}

type Query{
  getAdmins : [Admin]
  getAdmin(id: ID!) : Admin
}

type Mutation{
  addAdmin(input: AdminInput): Admin
  updateAdmin(id: ID!, input: AdminInput): Admin
  deleteAdmin(id: ID!): Alert
  loginAdmin(codigoAdmin: String!, password: String!): Response
}
`;

const adminResolvers = {
  Query: {
    async getAdmins(obj){
      return await Admin.find();
    },
    async getAdmin(obj, {id}){
      return await Admin.findById(id);
    }
  },
  Mutation: {
    async addAdmin(obj, {input}){
      let temp = new Admin(input);

      const password = await bcrypt.hash(input.password, 10);
      temp.password = password;

      await temp.save();
      return temp;
    },
    async updateAdmin(obj, {id, input}){
      return await Admin.findByIdAndUpdate(id, input);
    },
    async deleteAdmin(obj, {id}){
      await Admin.deleteOne({_id: id});
      return{
        message:"Admin Eliminado" 
      }
    },
    async loginAdmin(obj, {codigoAdmin, password}){
      // Validate data
      if (!(codigoAdmin && password)) {
        return {
          message: "Missing data.",
          code: 400
        }
      }

      // Validate if register exist
      const admin = await Admin.findOne({ "codigoAdmin":codigoAdmin });

      // Get token
      if (admin && (await bcrypt.compare(password, admin.password))) {
        
        const token = jwt.sign(
          { type: "admin", code: admin.codigoAdmin },
          process.env.TOKEN_KEY,
          {
            expiresIn: "3h",
          }
        );

        admin.token = token;

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

module.exports = { adminSchema, adminResolvers};