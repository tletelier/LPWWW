import React from 'react';
import { Box, Stack, Typography } from '@mui/material';

const ValesView = () => {
  return (
    <Stack direction="column" spacing={2} sx={{ pb: 4 }}>
      <Box sx={{ px: 4, py: 2 }}>
        <Typography variant="h4">
          <b>Tipos de vales existentes:</b>
        </Typography>
      </Box>
      <Stack sx={{ px: 4, py: 2 }}>hi</Stack>
    </Stack>
  );
};
export default ValesView;
