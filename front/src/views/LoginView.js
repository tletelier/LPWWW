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
import { useMutation } from '@apollo/client';

const LoginView = () => {
  const navigate = useNavigate();
  const [codigo, setCodigo] = useState(null);
  const [token, setToken] = useState(null);
  const [password, setPassword] = useState(null);
  const [tipo, setTipo] = useState('Funcionario');
  const [correct, setCorrect] = useState(false);
  const [error, setError] = useState(false);
  const handleCodigoChange = (event) => {
    setCodigo(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handleTipoChange = (event) => {
    setTipo(event.target.value);
  };
  const handleClick = async (event) => {
    event.preventDefault();
  };

  const [loginAdmin, { loading, error2, data }] = useMutation(Constants.LOGIN_ADMIN_MUTATION);
  if (loading) return 'Loading...';
  if (error2) return `Error! ${error2.message}`;

  const handleLogin = () => {
    if (password !== null && codigo != null) {
      switch (tipo) {
        case 'Funcionario': {
          navigate('/funcionario');
          break;
        }
        case 'Cajero': {
          navigate('/cajero');
          break;
        }
        case 'Administrador': {
          console.log(codigo, password);
          loginAdmin({
            variables: {
              codigoAdmin: codigo,
              password: password
            }
          });
          console.log(data);
          if (data.loginAdmin.code == '200') {
            navigate('/vales');
          }
          break;
        }
      }
    } else {
      //
    }
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
                <img src={logo} alt="Logo Kidspace" width="60%" />
                <Typography variant="h5" sx={{ mt: 2 }}>
                  Servicio de Casinos
                </Typography>
              </Stack>
              <FormControl fullWidth>
                <InputLabel id="select-label">Tipo de cuenta</InputLabel>
                <Select
                  required
                  labelId="select-label"
                  id="select"
                  label="Tipo de cuenta"
                  value={tipo}
                  onChange={handleTipoChange}>
                  <MenuItem value="Funcionario">
                    <Typography>Funcionario</Typography>
                  </MenuItem>
                  <MenuItem value="Cajero">
                    <Typography>Cajero</Typography>
                  </MenuItem>
                  <MenuItem value="Administrador">
                    <Typography>Administrador</Typography>
                  </MenuItem>
                </Select>
              </FormControl>
              <Stack spacing={2}>
                <TextField required label="Código" onChange={handleCodigoChange} />
                <TextField
                  required
                  type="password"
                  label="Contraseña"
                  onChange={handlePasswordChange}
                />
              </Stack>
              {correct && <Alert severity="success">Sesión Iniciada</Alert>}
              {error && <Alert severity="error">Usuario o Contraseña Incorrecta</Alert>}
              <Stack spacing={1}>
                <Button
                  variant="oscuro"
                  sx={{ width: 150, alignSelf: 'center' }}
                  type="submit"
                  onClick={handleLogin}>
                  Iniciar sesion
                </Button>
                <Button
                  variant="claro"
                  sx={{ width: 150, alignSelf: 'center' }}
                  onClick={() => navigate('/register')}>
                  Registrar{' '}
                </Button>
              </Stack>
            </Stack>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default LoginView;
