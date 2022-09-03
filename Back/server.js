const mongoose = require('mongoose');
// const bodyParser = require('body-parse');
const express = require('express');
const cors = require('cors');
const {ApolloServer, gql} = require ('apollo-server-express');
// const {merge, unary} = require('lodash');
const User = require('./models/user');

const dotenv = require('dotenv')
dotenv.config();

const URI = process.env.MONGO_URI;

mongoose.connect(URI, {
  useNewUrlParser: true, 
  useUnifiedTopology: true
  }, err => {
    if(err) throw err;
    console.log('Connected to MongoDB!!!')
  });

const typeDefs = gql`
type User{
  id: ID!
  correo: String!
  pass: String!
}

input UserInput{
  correo: String!
  pass: String!
}

type Alert{
  message: String
}

type Query{
  getUsers: [User]
  getUser(id: ID!): User
}

type Mutation{
  addUser(input: UserInput): User
  updateUser(id: ID!, input: UserInput) :  User
  deleteUser(id: ID!) : Alert
}
`;

const resolvers = {
  Query: {
    async getUsers(obj){
      const users = await User.find();
      return users;
    },
    // async getLibros(obj){
    //   const libros = await
    // },
    async getUser(obj, {id}){
      const user = await User.findById(id);
      return user;
    }
  },
  Mutation: {
    async addUser(obj, {input}){
      const user = new User(input);
      await user.save();
      return user;
    },
    async updateUser(obj, {id, input}){
      const user = await User.findByIdAndUpdate(id, input);
      return user;
    },
    async deleteUser(obj, {id}){
      await User.deleteOne({_id: id});
      return{
        message:"User Eliminado" 
      }
    }
  }
}

let apolloServer = null;

const corsOptions = {
  origin: process.env.SERVER_PORT,
  credentials: false
};

async function startServer(){
  const apolloServer = new ApolloServer({typeDefs, resolvers, corsOptions});
  await apolloServer.start();
  apolloServer.applyMiddleware({app, cors:false});
}

startServer();

const app = express();

app.use(cors());
app.listen(8090, function(){
  console.log("Servidor Iniciado");
})

