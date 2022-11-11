/* eslint-disable react/prop-types */
/* eslint-disable max-len */
/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
import {
  Button,
  TextField,
  Card,
  CardContent,
  Divider,
  Stack,
  Typography,
  Grid,
  Box
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';

const ValesEditing = ({ estado }) => {
  const navigate = useNavigate();
  const params = useParams();
  const { nvalesId, nperfil, nvalesPorTurno, nvalor } = params;
  const [nombre, setNombre] = useState(nperfil);
  const [valesPorTurno, setValesPorTurno] = useState(nvalesPorTurno);
  const [valor, setValor] = useState(nvalor);
  const [editingVale, setEditingVale] = useState(false);
  const [nuevo, setNuevo] = useState(false);
  useEffect(() => {
    if (estado === 'nuevo') {
      setEditingVale(true);
      setNuevo(true);
      console.log(nvalesId);
      console.log(editingVale);
    } else {
      console.log('ole');
    }
  }, []);

  const handleCancelarClick = () => {
    if (!nvalesId) {
      navigate('/vales');
    }
    setEditingVale(false);
  };

  const handleGuardarClick = async () => {
    setEditingVale(false);
    setNuevo(false);
    //
  };

  const handleNombreChange = (e) => {
    setNombre(e.target.default);
  };
  const handleValesPorTurnoChange = (e) => {
    setValesPorTurno(e.target.default);
  };
  const handleValorChange = (e) => {
    setValor(e.target.default);
  };
  return (
    <Stack padding={4}>
      <Typography variant="h4">Datos del vale :</Typography>
      <Card elevation={4} sx={{ borderRadius: '20px', marginTop: 2 }}>
        <CardContent>
          <Stack direction="row" justifyContent="space-between">
            <Typography>Datos del vale:</Typography>
            {!nuevo ? (
              <Button
                startIcon={<EditIcon />}
                onClick={() => {
                  setEditingVale(true);
                }}>
                Editar
              </Button>
            ) : (
              <Box />
            )}
          </Stack>
          <Divider />
          <Stack spacing={3} direction="column" py={5}>
            <Grid container spacing={1}>
              <Grid item xs={12} sm={6} md={3}>
                <Typography variant="subtitle2" px={5}>
                  Nombre
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={7}>
                <TextField
                  size="small"
                  disabled={!editingVale}
                  value={nombre}
                  onChange={handleNombreChange}
                  sx={{ borderRadius: 10 }}
                />
              </Grid>
            </Grid>
            <Grid container spacing={1}>
              <Grid item xs={12} sm={6} md={3}>
                <Typography variant="subtitle2" px={4}>
                  Vales Por Turno
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={7}>
                <TextField
                  size="small"
                  disabled={!editingVale}
                  value={valesPorTurno}
                  onChange={handleValesPorTurnoChange}
                  sx={{ borderRadius: 10 }}
                />
              </Grid>
            </Grid>
            <Grid container spacing={1}>
              <Grid item xs={12} sm={6} md={3}>
                <Typography variant="subtitle2" px={4}>
                  Valor
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={7}>
                <TextField
                  size="small"
                  disabled={!editingVale}
                  value={valor}
                  onChange={handleValorChange}
                  sx={{ borderRadius: 10 }}
                />
              </Grid>
            </Grid>
            <Stack direction="row">
              <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-end' }}>
                {editingVale && (
                  <Stack direction="row">
                    <Button
                      onClick={handleCancelarClick}
                      variant="contained"
                      color="inherit"
                      sx={{ marginRight: 2, borderRadius: 5 }}>
                      {' '}
                      Cancelar{' '}
                    </Button>
                    <Button
                      onClick={handleGuardarClick}
                      variant="contained"
                      color="quaternary"
                      sx={{ borderRadius: 5 }}>
                      <Typography variant="button" color="white">
                        Guardar
                      </Typography>
                    </Button>
                  </Stack>
                )}
              </Box>
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </Stack>
  );
};

export default ValesEditing;
