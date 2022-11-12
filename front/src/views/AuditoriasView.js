import React from 'react';
import { Box, Stack, Typography, Button } from '@mui/material';
import InformesTable from '../components/InformesTable';

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
  return (
    <Stack direction="column" spacing={2} sx={{ pb: 4 }}>
      <Box sx={{ px: 4, py: 2 }}>
        <Typography variant="h4">
          <b>Auditorias:</b>
        </Typography>
      </Box>
      <Stack direction="row" justifyContent="flex-end" sx={{ px: 4 }}>
        <Button variant="oscuro">Generar Auditoria</Button>
      </Stack>
      <Stack sx={{ px: 4, py: 2, minWidth: 300 }}>
        <InformesTable rows={data} />
      </Stack>
    </Stack>
  );
};

export default AuditoriaView;
