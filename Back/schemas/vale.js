// Middleware
const auth = require("../middleware/auth");

// Models
const Vale = require('../models/vale');

const valeSchema = `

type Vale {
  id: ID!
  fecha: DateTime
  saldo: Int!
  estado: Int!
  servicio: Servicio
  funcionario: Funcionario
  cajero: Cajero
  sucursal: ID!
  perfilName: String!
  servicioName: String!
}

input ValeInput {
  fecha: DateTime
  servicio: String!
  funcionario: String!
  cajero: String!
  sucursal: ID!
  perfilName: String!
  servicioName: String!
}

type Query{

  getVales: [Vale]
  getVale(id: ID!): Vale
}

type Mutation{

  addVale(input: ValeInput): Vale
  updateVale(id: ID!, input: ValeInput): Vale
  deleteVale(id: ID!): Alert
}
`;

const valeResolvers = {
  Query: {

    async getVales(obj){
      return await Vale.find();
    },
    async getVale(obj, {id}){
      return await Vale.findById(id);
    }
  },
  Mutation: {
    async addVale(obj, {input}){
      const temp = new Vale(input);
      await temp.save();
      return temp;
    },
    async updateVale(obj, {id, input}){      
      let valeGet = await Vale.findById(id);
      if(valeGet===null){//si se intenta usar un vale que ya fue eliminado
        return{
          message:"Vale Inválido" 
        }
      } else{//si el vale es válido
        let estado = valeGet.estado;
        let saldo = valeGet.saldo;               
        let servicioGet = await Servicio.findById(servicio);           
        if(saldo!=0){
          estado +=1; //se registra un uso
          input.estado=estado;
          if(servicioGet.valor===saldo){//se usa todo el saldo
            saldo=0;  //si se usa todo el vale cuenta como utilizado
            input.saldo=0;
            await Funcionario.updateOne(
              {_id: input.funcionario},
              {$inc: {valesNoUtilizados: -1, valesUtilizados: 1}}
            )      
          }
          else if(servicioGet.valor<saldo){//queda saldo a favor
            saldo = saldo - servicio.valor; //se resta el saldo según valor del servicio
            input.saldo=saldo;
          }      
          else{//falta saldo para la compra
            let saldoTemp=saldo;
            saldo=0;//si se usa todo el vale cuenta como utilizado
            input.saldo=0;
            await Funcionario.updateOne(
              {_id: input.funcionario},
              {$inc: {valesNoUtilizados: -1, valesUtilizados: 1}}
            )
            return{
              message:"Se debe pagar la diferencia de " + (servicio.valor-saldoTemp) 
            }
          }  

        }      
        else{//no tiene saldo
          return{
            message:"Este vale agotó su saldo disponible" 
          }
        } 
        
        return await Vale.findByIdAndUpdate(id, input);
      }
      
    },
    async deleteVale(obj, {id}){
      await Vale.deleteOne({_id: id});
      return{
        message:"Vale Eliminado" 
      }
    }
  }
};

module.exports = { valeSchema, valeResolvers};