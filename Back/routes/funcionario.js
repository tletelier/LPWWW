var express = require('express');
var router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require('dotenv')
dotenv.config();

// Models
const Funcionario = require('../models/funcionario');

router.get("/", async (req, res) => {

  let resp_data

  const query_id = req.query.id
  const query_correo = req.query.correo

  if(query_id){
    resp_data = await Funcionario.findOne({"_id": ObjectId(query_id)})
  }else if(query_correo){
    resp_data = await Funcionario.findOne({"correo": query_correo})
  }else{
    resp_data  = await Funcionario.find()
  }

  return res.status(200).json(resp_data)
});

// Register funcionario
router.post("/create", async (req, res) => {

  // Get data
  const { nombres, apellidos, codigoFuncionario, correo, pass, perfil, valesDisponibles, valesUtilizados, valesNoUtilizados, sucursal } = req.body;

  // Validate data
  if(!(nombres && apellidos && correo && pass)){
    return res.status(400).send("Missing data.");
  }

  // Check if register exist
  const funcionario = await Funcionario.findOne({ codigoFuncionario });

  if (funcionario) {
    return res.status(409).send("Register already exist.");
  }

  //Make password
  const password = await bcrypt.hash(pass, 10);

  // Create new token and register
  const token = jwt.sign(
    { id: codigoFuncionario, correo },
    process.env.TOKEN_KEY,
    {
      expiresIn: "1h",
    }
  );

  const new_register = await Funcionario.create({
    nombres: nombres,
    apellidos: apellidos,
    codigoFuncionario: codigoFuncionario,
    correo: correo, 
    pass: password,
    perfil: perfil || "none",
    valesDisponibles: valesDisponibles || 0,
    valesUtilizados: valesUtilizados || 0,
    valesNoUtilizados: valesNoUtilizados || 0,
    sucursal: sucursal,
    token: token
  });

  // Return new register
  return res.status(201).json(new_register);
});

// Auth
router.post("/login", async (req, res) => {
  // Get data
  const { correo, pass } = req.body;

  // Validate data
  if (!(correo && pass)) {
    return res.status(400).send("Missing data.");
  }

  // Validate if register exist
  const funcionario = await Funcionario.findOne({ "correo":correo });

  // Get token
  if (funcionario && (await bcrypt.compare(pass, funcionario.pass))) {
    
    const token = jwt.sign(
      { codigoFuncionario: funcionario.codigoFuncionario, correo },
      process.env.TOKEN_KEY,
      {
        expiresIn: "1h",
      }
    );

    funcionario.token = token;

    // Return register with token
    return res.status(200).json(funcionario);
  }
  return res.status(400).send("Invalid email or password.");
});

// Delete
router.delete("/", async (req, res) => {

  if(!req.query.id){
    return res.status(404).send("Missing id.")
  }

  const register = await Funcionario.findOne({"_id": req.query.id})
  if(!register){
    return res.status(404).send("Not found.")  
  }

  await Funcionario.deleteOne({"_id": req.query.id})
  return res.status(200).json(register);
});

// // Test
// router.post("/test", auth, (req, res) => {
//   res.status(200).send("Habemus token.");
// });

// router.post("/test2", (req, res) => {
//   res.status(200).send("No necesitamus token.");
// });

module.exports = router;