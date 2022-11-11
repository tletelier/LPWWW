/* eslint-disable react/prop-types */
import { Box, Stack, Typography, Card } from '@mui/material';
import React from 'react';

import notfound from '../assets/notfound.webp';

const SinContenido = ({ mainmsg, submsg }) => (
  <Stack direction="column" sx={{ alignItems: 'center' }}>
    <Card elevation={4}>
      <Box
        component="img"
        sx={{
          maxHeight: { xs: 100, md: 250 },
          maxWidth: { xs: 100, md: 250 },
          alignSelf: 'center',
          m: 2
        }}
        alt="Registros no encontrados"
        src={notfound}
      />
      <Typography variant="h6">{mainmsg}</Typography>
      <Typography sx={{ py: 2 }}>{submsg}</Typography>
    </Card>
  </Stack>
);

export default SinContenido;
