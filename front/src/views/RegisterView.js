/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import {
  Grid,
  TextField,
  Paper,
  Button,
  Alert,
  Stack,
  Typography,
  Select,
  MenuItem,
  SelectChangeEvent,
  FormControl,
  InputLabel
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import * as Constants from '../constants';
import ServiciosTable from '../components/ServiciosTable';
import logo from '../assets/logo2.png';

const RegisterView = () => {
  const [codigo, setCodigo] = useState({});
  const [password, setPassword] = useState({});
  const [nombres, setNombres] = useState('');
  const [email, setEmail] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [tipo, setTipo] = useState('Funcionario');
  const [correct, setCorrect] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const handleNombresChange = (event) => {
    setNombres(event.target.value);
  };

  const handleApellidosChange = (event) => {
    setApellidos(event.target.value);
  };

  const handleCodigoChange = (event) => {
    setCodigo(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleTipoChange = (event) => {
    setTipo(event.target.value);
  };
  const handleClick = async (event) => {
    event.preventDefault();
    console.log('login');
  };
  return (
    <Grid
      container
      spacing={0}
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: '100vh', backgroundColor: '#ADB7B9' }}>
      <Grid item xs={12} sm={6} md={4}>
        <Paper
          sx={{
            textAlign: 'center',
            m: 2,
            p: 2,
            backgroundColor: '#F6F4F1'
          }}
          elevation={3}>
          <form onSubmit={handleClick}>
            <Stack spacing={4} sx={{ justifyContent: 'space-between' }}>
              <Stack alignItems="center">
                <img src={logo} alt="Logo Kidspace" width="75%" />
                <Typography variant="h5" sx={{ mt: 2 }}>
                  Registro
                </Typography>
              </Stack>
              <Stack spacing={2}>
                <TextField required label="Nombres" onChange={handleNombresChange} />
                <TextField required label="Apellidos" onChange={handleApellidosChange} />
                <TextField required label="Código" onChange={handleCodigoChange} />
                <TextField required label="Email" onChange={handleEmailChange} />
                <TextField
                  required
                  type="password"
                  label="Contraseña"
                  onChange={handlePasswordChange}
                />
              </Stack>
              {correct && <Alert severity="success">Usuario registrado</Alert>}
              {error && <Alert severity="error">Datos invalidos</Alert>}
              <Stack direction="row" spacing={1}>
                <Button
                  variant="outlined"
                  sx={{ width: 200, borderRadius: 20, textTransform: 'none' }}
                  onClick={() => navigate('/login')}>
                  Iniciar Sesión
                </Button>
                <Button variant="claro" sx={{ width: 200 }} onClick={() => navigate('/register')}>
                  Registrar
                </Button>
              </Stack>
            </Stack>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default RegisterView;
