const { makeExecutableSchema } = require('graphql-tools');
const { merge } = require('lodash');

// Schemas
const { 
  AdminSchema, 
  adminResolvers
} = require('./admin');

const { 
  CajeroSchema, 
  cajeroResolvers,
} = require('./cajero');

const { 
  FuncionarioSchema, 
  funcionarioResolvers
} = require('./funcionario');

const { 
  InformeSchema, 
  informeResolvers
} = require('./informe');

const { 
  ServicioSchema, 
  servicioResolvers
} = require('./servicio');

const { 
  SucursalSchema, 
  sucursalResolvers
} = require('./sucursal');

const { 
  ValeSchema, 
  valeResolvers
} = require('./vale');

const { 
  General
} = require('./general');


const schema = makeExecutableSchema({
  typeDefs: [adminSchema, cajeroSchema, funcionarioSchema],
  resolvers: adminResolvers
})

module.exports = { schema }