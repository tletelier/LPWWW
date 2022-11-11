/* eslint-disable react/prop-types */
import { Box, Stack, Typography } from '@mui/material';
import React from 'react';

import notfound from '../assets/notfound.webp';

const SinContenido = ({ mainmsg, submsg }) => (
  <Stack direction="column" sx={{ alignItems: 'center' }}>
    <Box
      component="img"
      sx={{
        maxHeight: { xs: 100, md: 250 },
        maxWidth: 1,
        alignSelf: 'center',
        alignContent: 'center',
        m: 2
      }}
      alt="Registros no encontrados"
      src={notfound}
    />
    <Typography align="center" variant="h6">
      {mainmsg}
    </Typography>
    <Typography align="center" sx={{ py: 2 }}>
      {submsg}
    </Typography>
  </Stack>
);

export default SinContenido;
