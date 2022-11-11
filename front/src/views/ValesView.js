import React from 'react';
import { Box, Stack, Typography, Button } from '@mui/material';
import ValesTable from '../components/ValesTable';

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
        valor: 2000
      },
      {
        _id: 'sdfsdfsfd',
        cantidad: 2,
        nombre: 'Gerente',
        valor: 5000,
        valesPorTurno: 2
      }
    ]
  },
  {
    _id: 'sdfsghjgd',
    horarioFin: '7:00',
    horarioInicio: '9:00',
    nombre: 'desayuno',
    perfiles: [
      {
        _id: 'sdfsd',
        cantidad: 3,
        valesPorTurno: 1,
        valor: 1500,
        nombre: 'Obrero'
      }
    ]
  },
  {
    _id: 'sdasdw342fsd',
    horarioFin: '16:00',
    horarioInicio: '18:00',
    nombre: 'once',
    perfiles: []
  }
];

const ValesView = () => {
  return (
    <Stack direction="column" spacing={2} sx={{ pb: 4 }}>
      <Box sx={{ px: 4, py: 2 }}>
        <Typography variant="h4">
          <b>Tipos de vales existentes:</b>
        </Typography>
      </Box>
      {data.map((servicio, id) => (
        <Box key={id} sx={{ marginTop: 5 }}>
          <Stack direction="row" justifyContent="flex-end" sx={{ px: 4 }}>
            <Button variant="oscuro">Anadir perfil a vale {servicio.nombre}</Button>
          </Stack>
          <Typography align="center">
            <b>{servicio.nombre}</b>
          </Typography>
          <Stack sx={{ px: 4, py: 2, width: 1 }}>
            <ValesTable rows={servicio.perfiles} />
          </Stack>
        </Box>
      ))}
    </Stack>
  );
};
export default ValesView;
