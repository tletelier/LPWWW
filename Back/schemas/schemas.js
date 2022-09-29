const { makeExecutableSchema } = require('graphql-tools');
const { merge } = require('lodash');

// Schemas
const { 
  adminSchema, 
  adminResolvers
} = require('./admin');

const { 
  cajeroSchema, 
  cajeroResolvers,
} = require('./cajero');

const { 
  funcionarioSchema, 
  funcionarioResolvers
} = require('./funcionario');

const { 
  informeSchema, 
  informeResolvers
} = require('./informe');

const { 
  servicioSchema, 
  servicioResolvers
} = require('./servicio');

const { 
  sucursalSchema, 
  sucursalResolvers
} = require('./sucursal');

const { 
  valeSchema, 
  valeResolvers
} = require('./vale');

const { 
  generalSchema
} = require('./general');


const schema = makeExecutableSchema({
  typeDefs: [adminSchema, cajeroSchema, funcionarioSchema, informeSchema, servicioSchema, sucursalSchema, valeSchema, generalSchema],
  resolvers: merge(adminResolvers, cajeroResolvers, funcionarioResolvers, informeResolvers, servicioResolvers, sucursalResolvers, valeResolvers)
})

module.exports = { schema }