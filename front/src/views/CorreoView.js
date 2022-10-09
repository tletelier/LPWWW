import React from 'react';
import {
  Box,
  Stack,
  Typography,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl
} from '@mui/material';

const CorreoView = () => {
  const [tiempo, setTiempo] = React.useState('1 semana');
  const handleTiempo = (event) => {
    setTiempo(event.target.value);
  };
  return (
    <Stack direction="column" spacing={2} sx={{ pb: 4 }}>
      <Box sx={{ px: 4, py: 2 }}>
        <Typography variant="h4">
          <b>Servicio de Correo - informe de vales</b>
        </Typography>
      </Box>
      <Stack sx={{ px: 4, py: 2 }}>
        <Typography>
          El servicio de correo enviará un aviso a todos los funcionarios con la siguiente
          información:
        </Typography>
        <br />
        <Typography>
          <li>Vales disponibles</li>
          <li>Vales Utilizados</li>
          <li>Vales No Utilizados</li>
        </Typography>
      </Stack>
      <Stack direction="row" sx={{ px: 4, py: 2 }}>
        <Stack sx={{ px: 4, py: 2, alignSelf: 'left', justifyContent: 'center' }}>
          <Typography>Enviar automáticamente cada:</Typography>
        </Stack>
        <Stack sx={{ px: 4, py: 2, alignSelf: 'right' }}>
          <FormControl variant="filled" sx={{ m: 1, minWidth: 200, alignSelf: 'right' }}>
            <InputLabel id="demo-simple-select-standard-label">Periodo de tiempo</InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={tiempo}
              onChange={handleTiempo}
              label="Periodo de tiempo">
              <MenuItem value={'1 semana'}>1 semana</MenuItem>
              <MenuItem value={'2 semanas'}>2 semanas</MenuItem>
              <MenuItem value={'4 semanas'}>3 semanas</MenuItem>
              <MenuItem value={'4 semanas'}>4 semanas</MenuItem>
            </Select>
          </FormControl>
        </Stack>
      </Stack>
      <Stack direction="row" justifyContent="flex-end" sx={{ px: 4 }}>
        <Button variant="oscuro">Guardar</Button>
      </Stack>
    </Stack>
  );
};

export default CorreoView;
