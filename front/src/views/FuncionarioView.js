/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import {
  Grid,
  TextField,
  Paper,
  Button,
  Alert,
  Stack,
  Typography,
  Select,
  MenuItem,
  SelectChangeEvent,
  FormControl,
  Card,
  InputLabel
} from '@mui/material';
import ServiciosDisponiblesTable from '../components/ServiciosDisponiblesTable';

const data = [
  {
    _id: 'sdfsd',
    horarioFin: '2:00',
    horarioInicio: '5:00',
    nombre: 'almuerzo',
    perfiles: [
      {
        _id: 'sdfsd',
        cantidad: 3,
        nombre: 'Obrero',
        valesPorTurno: 1,
        valor: 5000,
        funcionario: [
          {
            _id: 'asdfasd',
            nombre: 'Jen Jen',
            valesUsados: 1
          }
        ]
      }
    ]
  },
  {
    _id: 'sdfdrfgfdgsd',
    horarioFin: '2:00',
    horarioInicio: '5:00',
    nombre: 'desayuno',
    perfiles: [
      {
        _id: 'sdfsd',
        cantidad: 3,
        nombre: 'Obrero',
        valesPorTurno: 1,
        valor: 2000,
        funcionario: [
          {
            _id: 'asdfasd',
            nombre: 'Jen Jen',
            valesUsados: 0
          }
        ]
      }
    ]
  }
];

const FuncionarioView = () => {
  const [vale, setVale] = useState(1350);
  const [cantidad, setCantidad] = useState(1350);
  const [item, setItem] = useState(1350);
  const [fecha, setFecha] = useState('05/05/2020');
  const [hora, setHora] = useState('08:00');
  const user = {
    nombres: 'Jen',
    apellidos: 'Jen',
    codigo: 152,
    perfil: 'Obrero',
    servicio: 'desayuno'
  };
  const [sucursal, setSucursal] = useState('(02) Azucenas');
  const [total, setTotal] = useState(350);
  const [dataValeId, setDataValeId] = useState();
  // console.log(data);
  return (
    <Stack spacing={3} sx={{ px: 3, alignContent: 'center', m: 2 }}>
      <Stack direction="row" spacing={5} sx={{ justifyContent: 'center' }}>
        <Typography align="left">Sucursal: {sucursal}</Typography>
        <Typography align="right">Fecha: {fecha}</Typography>
      </Stack>
      <Stack sx={{ py: 2, minWidth: 800, maxWidth: 1000, alignSelf: 'center' }}>
        <ServiciosDisponiblesTable rows={data} />
      </Stack>
    </Stack>
  );
};

export default FuncionarioView;
