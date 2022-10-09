import React, { useEffect, useState } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import axios from 'axios';
import * as Constants from '../constants';
import ServiciosTable from '../components/ServiciosTable';

const ServiciosView = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const queryData = await axios.post(Constants.GRAPHQL_API, {
        query: Constants.GET_SERVICIOS_QUERY
      });
      const result = queryData.data.data;
      setData(result.getServicios);
    };
    fetchData();
  }, []);
  console.log(data);
  return (
    <Stack direction="column" spacing={2} sx={{ pb: 4 }}>
      <Box sx={{ px: 4, py: 2 }}>
        <Typography variant="h4">
          <b>Servicios existentes:</b>
        </Typography>
      </Box>
      <Stack sx={{ px: 4, py: 2 }}>
        hi
        <ServiciosTable rows={data} />
      </Stack>
    </Stack>
  );
};

export default ServiciosView;
