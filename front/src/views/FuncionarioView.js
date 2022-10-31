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
  const handleValeChange = (event) => {
    setVale(event.target.value);
  };
  const handleItemChange = (event) => {
    setItem(event.target.value);
  };
  return (
    <Grid container spacing={0}>
      <Grid item xs={12} sm={6} md={7}>
        <Stack direction="column" spacing={2}>
          <Stack spacing={3} sx={{ px: 3 }}>
            <Stack direction="row" spacing={5} sx={{ justifyContent: 'center' }}>
              <Typography align="left">Sucursal: {sucursal}</Typography>
              <Typography align="right">Fecha: {fecha}</Typography>
            </Stack>
            <Stack sx={{ py: 2, minWidth: 300 }}>
              tabla
              {/* <ServiciosTable rows={data} /> */}
            </Stack>
          </Stack>
        </Stack>
      </Grid>
      <Grid item xs={12} sm={6} md={5}>
        <Stack spacing={3} sx={{ px: 3, mr: 5 }}>
          <Card sx={{ backgroundColor: '#F6F4F1', p: 4, borderRadius: 5 }}>
            <Stack spacing={2}>
              <Typography variant="h4" align="center" sx={{ color: '#000', m: 3 }}>
                <b>N° Vale: {vale}</b>
              </Typography>
              <Typography sx={{ color: '#000' }}>
                <b>FECHA</b> : {fecha}
              </Typography>
              <Typography sx={{ color: '#000' }}>
                <b>HORA</b> : {hora}
              </Typography>
              <Typography sx={{ color: '#000' }}>
                <b>CODIGO</b> : {user.codigo}
              </Typography>
              <Typography sx={{ color: '#000' }}>
                <b>FUNCIONARIO</b> : {user.nombres} {user.apellidos}
              </Typography>
              <Typography sx={{ color: '#000' }}>
                <b>SERVICIO</b> : {user.Servicios}
              </Typography>
              <Typography sx={{ color: '#000' }}>
                <b>PERFIL</b> : {user.perfil}
              </Typography>
              <Typography variant="h6" align="center" sx={{ color: '#000', m: 2 }}>
                <b>VALOR</b> : {cantidad}
              </Typography>
            </Stack>
          </Card>
          <Stack direction="row" sx={{ justifyContent: 'center' }}>
            <Button variant="oscuro">Emitir Vale</Button>
          </Stack>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default FuncionarioView;
