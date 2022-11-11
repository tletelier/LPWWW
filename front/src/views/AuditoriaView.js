import React from 'react';
import { Box, Stack, Typography, Button } from '@mui/material';
import AuditoriaTable from '../components/AuditoriaTable';
import { useNavigate, useParams } from 'react-router-dom';

const data = [
  {
    _id: 'sdfsd',
    id: 1234,
    administrador: 'Skylar Cirrus',
    fecha: '01/05/2022',
    cantidad: 2,
    vales: [
      {
        _id: 'asdajk',
        fecha: '01/05/2022',
        saldo: 2500,
        estado: 1,
        funcionario: 'Jennie Kim',
        cajero: 'Rose Park',
        sucursal: '(02) Magnolias',
        perfilName: 'Jefe',
        servicioName: 'almuerzo'
      },
      {
        _id: 'asdajk',
        fecha: '01/05/2022',
        saldo: 2500,
        estado: 1,
        funcionario: 'Jennie Kim',
        cajero: 'Rose Park',
        sucursal: '(02) Magnolias',
        perfilName: 'Jefe',
        servicioName: 'almuerzo'
      }
    ]
  },
  {
    _id: 'sdffghffghsd',
    id: 1235,
    administrador: 'Jennis Lisa',
    fecha: '12/10/2022',
    cantidad: 2,
    vales: [
      {
        _id: 'asdajk',
        fecha: '01/05/2022',
        saldo: 2500,
        estado: 1,
        funcionario: 'Jennie Kim',
        cajero: 'Rose Park',
        sucursal: '(02) Magnolias',
        perfilName: 'Jefe',
        servicioName: 'almuerzo'
      },
      {
        _id: 'asdajk',
        fecha: '01/05/2022',
        saldo: 2500,
        estado: 1,
        funcionario: 'Jennie Kim',
        cajero: 'Rose Park',
        sucursal: '(02) Magnolias',
        perfilName: 'Jefe',
        servicioName: 'almuerzo'
      }
    ]
  }
];

const AuditoriaView = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { auditoriaId } = params;
  console.log(auditoriaId);
  let auditoria;

  data.map((key) => {
    if (key._id == auditoriaId) {
      console.log('Finded');
      auditoria = key;
    }
  });

  const handleCancelarClick = () => {
    navigate('/auditoria');
  };
  console.log(data);
  return (
    <Stack direction="column" spacing={2} sx={{ pb: 4 }}>
      <Box sx={{ px: 4, py: 2 }}>
        <Typography variant="h4">
          <b>Auditoria:</b>
        </Typography>
        <Typography variant="h6">
          <b>Administrador: {auditoria.administrador}</b>
        </Typography>
        <Typography variant="h6">
          <b>Fecha: {auditoria.fecha}</b>
        </Typography>
        <Typography variant="h6">
          <b>Vales emitidos: {auditoria.cantidad}</b>
        </Typography>
        <Typography variant="h6">
          <b>Vales usados: {auditoria.cantidad}</b>
        </Typography>
        <Typography variant="h6">
          <b>Vales no usados: {0}</b>
        </Typography>
      </Box>
      <Stack sx={{ px: 4, py: 2, minWidth: 300 }}>
        <AuditoriaTable rows={auditoria} />
      </Stack>
      <Stack direction="row">
        <Button
          onClick={handleCancelarClick}
          variant="contained"
          color="inherit"
          sx={{ marginRight: 2, borderRadius: 5 }}>
          {' '}
          Volver{' '}
        </Button>
      </Stack>
    </Stack>
  );
};

export default AuditoriaView;
