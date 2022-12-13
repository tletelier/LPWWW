/* eslint-disable no-unused-vars */
import React from 'react';
import * as Constants from '../constants';
import { Box, Stack, Typography, Button } from '@mui/material';
import FuncionariosTable from '../components/FuncionariosTable';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

const PerfilesView = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { perfil } = params;
  const handleCancelarClick = () => {
    navigate('/perfiles');
  };

  const { loading, error, data } = useQuery(Constants.GET_FUNCIONARIOS_PERFIL_QUERY, {
    variables: {
      perfilId: perfil
    }
  });

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;
  console.log(data.getFuncionariosPerfil);

  return (
    <Stack direction="column" spacing={2} sx={{ pb: 4 }}>
      <Box sx={{ px: 4, py: 2 }}>
        <Typography variant="h4">
          <b>{perfil}:</b>
        </Typography>
      </Box>
      <Stack sx={{ px: 4, py: 2, minWidth: 300 }}>
        <FuncionariosTable rows={data.getFuncionariosPerfil} />
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

export default PerfilesView;
