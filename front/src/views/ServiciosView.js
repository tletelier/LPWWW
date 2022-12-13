/* eslint-disable no-unused-vars */
import * as Constants from '../constants';
import ServiciosTable from '../components/ServiciosTable';
import { Box, Stack, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';

const ServiciosView = () => {
  const navigate = useNavigate();
  const handleCrear = () => {
    navigate('/servicios/crearServicio');
  };
  const { loading, error, data } = useQuery(Constants.GET_SERVICIOS_QUERY);
  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;
  return (
    <Stack direction="column" spacing={2} sx={{ pb: 4 }}>
      <Box sx={{ px: 4, py: 2 }}>
        <Typography variant="h4">
          <b>Servicios existentes:</b>
        </Typography>
      </Box>
      <Stack direction="row" justifyContent="flex-end" sx={{ px: 4 }}>
        <Button variant="oscuro" onClick={handleCrear}>
          Crear Servicio
        </Button>
      </Stack>
      <Stack sx={{ px: 4, py: 2, minWidth: 300 }}>
        <ServiciosTable rows={data.getServicios} />
      </Stack>
    </Stack>
  );
};

export default ServiciosView;
