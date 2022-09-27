import { readFileSync } from 'fs';

var express = require('express');
var router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require('dotenv')


dotenv.config();

// Models
const Funcionario = require('../models/funcionario');

const nodemailer = require('nodemailer');

const emailTemplate = readFileSync(path.join(__dirname, '../../assets/email/index.html')).toString();

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

// 
cron.schedule('7 *', () => { //cada 7 dias
  transporter.sendMail({
    from: 'Kidspace.cl',
    to: funcionario.email,
    subject: 'Aviso Semanal Vales', // Subject
    html: emailTemplate.format(i.valesDisponibles, i.valesUtilizados, funcionario.valesNoUtilizados),
    attachments: [{
      filename: 'image-1.png',
      path: path.join(__dirname, '../../assets/email/images/image-1.png'),
    }],
  });
});

router.get("/correos", async (req, res) => {
  try {
    const { id } = req.params;
    const funcionarios = await Funcionario.find({}, {email: 1});
    console.log('emailss')
    res.sendStatus(200);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});


module.exports = router;