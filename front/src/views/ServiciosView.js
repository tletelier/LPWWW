/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Box, Stack, Typography, Button } from '@mui/material';
import axios from 'axios';
import * as Constants from '../constants';
import ServiciosTable from '../components/ServiciosTable';
import { useNavigate } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client'
//import servicio from '../../../Back/models/servicio';

const data0 = [
  {
    _id: 'sdfsd',
    horarioFin: '2:00',
    horarioInicio: '5:00',
    nombre: 'almuerzo'
  },
  {
    _id: 'sdfsghjgd',
    horarioFin: '7:00',
    horarioInicio: '9:00',
    nombre: 'desayuno'
  },
  {
    _id: 'sdasdw342fsd',
    horarioFin: '16:00',
    horarioInicio: '18:00',
    nombre: 'once'
  }
];

const ServiciosView = () => {
  const { loading, error, data } = useQuery(Constants.GET_SERVICIOS_QUERY);
  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

//   const [data, setData] = useState([]);
//   useEffect(() => {
//     const fetchData = async () => {
//       const queryData = await axios.post(Constants.GRAPHQL_API, {
//         query: Constants.GET_SERVICIOS_QUERY
//       });
//       const result = queryData.data.data;
//       setData(result.getServicios);
//     };
//     fetchData();
//   }, []);
  
  const navigate = useNavigate();
  const handleCrear = () => {
    navigate('/servicios/crearServicio');
  };
  console.log(data.getServicios);
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
