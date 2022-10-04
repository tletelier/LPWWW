// Middleware
const auth = require("../middleware/auth");

// Models
const Vale = require('../models/vale');
const Funcionario = require('../models/funcionario');
const Servicio = require('../models/servicio');

const valeSchema = `

type Vale {
  id: ID!
  fecha: DateTime
  saldo: Int!
  estado: Int!
  funcionario: Funcionario
  cajero: Cajero
  sucursal: Sucursal
  perfilName: String!
  servicioName: String!
}

input ValeInput {
  fecha: DateTime
  saldo: Int!
  funcionario: ID!
  cajero: ID!
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

    async getVales(obj, {date}){
      if(date){
        return await Vale.find({fecha: {$gt:date}}).populate({path: 'funcionario'}).populate({path: 'sucursal'}).populate({path: 'cajero'});
      }else{
        return await Vale.find().populate({path: 'funcionario'}).populate({path: 'sucursal'}).populate({path: 'cajero'});
      }
    },
    async getVale(obj, {id}){
      return await Vale.findById(id).populate({path: 'funcionario'}).populate({path: 'sucursal'}).populate({path: 'cajero'});
    }
  },
  Mutation: {
    async addVale(obj, {input}){

      input.estado = 0;
      const temp = new Vale(input);
      await temp.save();

      await Funcionario.updateOne(
        {_id: input.funcionario},
        {$inc: {valesNoUtilizados: 1, valesDisponibles: -1}}
      )

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
        let servicioGet = await Servicio.findById(input.servicioName);           
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