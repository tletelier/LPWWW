import React from 'react';
import * as Constants from '../constants';
import { Box, Stack, Typography, Button } from '@mui/material';
import PerfilesTable from '../components/PerfilesTable';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';

const PerfilesView = () => {
  const navigate = useNavigate();
  const handleCrear = () => {
    navigate('/perfiles/crearPerfil');
  };
  const { loading, error, data } = useQuery(Constants.GET_PERFILES_QUERY);
  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  return (
    <Stack direction="column" spacing={2} sx={{ pb: 4 }}>
      <Box sx={{ px: 4, py: 2 }}>
        <Typography variant="h4">
          <b>Perfiles existentes:</b>
        </Typography>
      </Box>
      <Stack direction="row" justifyContent="flex-end" sx={{ px: 4 }}>
        <Button variant="oscuro" onClick={handleCrear}>
          Crear Perfil
        </Button>
      </Stack>
      <Stack sx={{ px: 4, py: 2, minWidth: 300 }}>
        <PerfilesTable rows={data.getPerfiles} />
      </Stack>
    </Stack>
  );
};

export default PerfilesView;
