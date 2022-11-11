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

const ServiciosEditing = ({ estado }) => {
  const navigate = useNavigate();
  const params = useParams();
  const { servicioId, nservicio, nhorarioInicial, nhorarioFinal } = params;
  // console.log(nservicio);
  const [nombre, setNombre] = useState(nservicio);
  const [horarioInicial, setHorarioInicial] = useState(nhorarioInicial);
  const [horarioFinal, setHorarioFinal] = useState(nhorarioFinal);
  const [editingServicio, setEditingServicio] = useState(false);
  const [nuevo, setNuevo] = useState(false);
  if (servicioId) {
    console.log(nuevo);
  }
  useEffect(() => {
    if (estado === 'nuevo') {
      setEditingServicio(true);
      setNuevo(true);
      console.log(servicioId);
      console.log(editingServicio);
    } else {
      console.log('ole');
    }
  }, []);

  const handleCancelarClick = () => {
    if (!nservicio) {
      navigate('/servicios');
    }
    setEditingServicio(false);
  };

  const handleGuardarClick = async () => {
    setEditingServicio(false);
    setNuevo(false);
    //
  };

  const handleNombreChange = (e) => {
    setNombre(e.target.default);
  };
  const handleHorarioInicialChange = (e) => {
    setHorarioInicial(e.target.default);
  };
  const handleHorarioFinalChange = (e) => {
    setHorarioFinal(e.target.default);
  };
  return (
    <Stack padding={4}>
      <Typography variant="h4">Datos del servicio :</Typography>
      <Card elevation={4} sx={{ borderRadius: '20px', marginTop: 2 }}>
        <CardContent>
          <Stack direction="row" justifyContent="space-between">
            <Typography>Datos del servicio:</Typography>
            {!nuevo ? (
              <Button
                startIcon={<EditIcon />}
                onClick={() => {
                  setEditingServicio(true);
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
                  disabled={!editingServicio}
                  value={nombre}
                  onChange={handleNombreChange}
                  sx={{ borderRadius: 10 }}
                />
              </Grid>
            </Grid>
            <Grid container spacing={1}>
              <Grid item xs={12} sm={6} md={3}>
                <Typography variant="subtitle2" px={4}>
                  Horario Inicial
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={7}>
                <TextField
                  size="small"
                  disabled={!editingServicio}
                  value={horarioInicial}
                  onChange={handleHorarioInicialChange}
                  sx={{ borderRadius: 10 }}
                />
              </Grid>
            </Grid>
            <Grid container spacing={1}>
              <Grid item xs={12} sm={6} md={3}>
                <Typography variant="subtitle2" px={4}>
                  Horario Final
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={7}>
                <TextField
                  size="small"
                  disabled={!editingServicio}
                  value={horarioFinal}
                  onChange={handleHorarioFinalChange}
                  sx={{ borderRadius: 10 }}
                />
              </Grid>
            </Grid>
            <Stack direction="row">
              <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-end' }}>
                {editingServicio && (
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

export default ServiciosEditing;
