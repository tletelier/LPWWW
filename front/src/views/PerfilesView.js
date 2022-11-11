import React from 'react';
import { Box, Stack, Typography, Button } from '@mui/material';
import PerfilesTable from '../components/PerfilesTable';

const data = [
  {
    _id: 'sdfsd',
    cantidad: 3,
    nombre: 'Obrero',
    funcionarios: [
      {
        _id: 'asdfasd',
        nombre: 'Jen Jen'
      },
      {
        _id: 'adfgsdfasd',
        nombre: 'Giselle'
      },
      {
        _id: 'asddfgfsdfasd',
        nombre: 'Ning Ning'
      }
    ]
  },
  {
    _id: 'sdfsdfsfd',
    cantidad: 2,
    nombre: 'Gerente',
    funcionarios: [
      {
        _id: 'asdsdfsasd',
        nombre: 'Chan Chan'
      },
      {
        _id: 'adfgsdfasdfssd',
        nombre: 'Lix Lix'
      }
    ]
  }
];

const PerfilesView = () => {
  return (
    <Stack direction="column" spacing={2} sx={{ pb: 4 }}>
      <Box sx={{ px: 4, py: 2 }}>
        <Typography variant="h4">
          <b>Perfiles existentes:</b>
        </Typography>
      </Box>
      <Stack direction="row" justifyContent="flex-end" sx={{ px: 4 }}>
        <Button variant="oscuro">Generar Nueva Auditoria</Button>
      </Stack>
      <Stack sx={{ px: 4, py: 2, minWidth: 300 }}>
        <PerfilesTable rows={data} />
      </Stack>
    </Stack>
  );
};

export default PerfilesView;
