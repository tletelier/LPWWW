import React from 'react';
import { Box, Stack, Typography, Button } from '@mui/material';
import FuncionariosTable from '../components/FuncionariosTable';
import { useNavigate, useParams } from 'react-router-dom';

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
  const navigate = useNavigate();
  const params = useParams();
  const { perfil } = params;

  let funcionarios;

  data.map((key) => {
    if (key.nombre == perfil) {
      funcionarios = key.funcionarios;
    }
  });

  const handleCancelarClick = () => {
    navigate('/perfiles');
  };
  console.log(data);
  return (
    <Stack direction="column" spacing={2} sx={{ pb: 4 }}>
      <Box sx={{ px: 4, py: 2 }}>
        <Typography variant="h4">
          <b>{perfil}:</b>
        </Typography>
      </Box>
      <Stack sx={{ px: 4, py: 2, minWidth: 300 }}>
        <FuncionariosTable rows={funcionarios} />
      </Stack>
      <Stack direction="row">
        <Button
          onClick={handleCancelarClick}
          variant="contained"
          color="inherit"
          sx={{ marginRight: 2, borderRadius: 5 }}>
          {' '}
          Cancelar{' '}
        </Button>
      </Stack>
    </Stack>
  );
};

export default PerfilesView;
