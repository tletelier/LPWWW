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
  Box,
  Modal
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';

const PerfilesEditing = ({ estado }) => {
  const navigate = useNavigate();
  const params = useParams();
  const { perfilId, nombre } = params;
  const [nombrePerfil, setNombrePerfil] = useState(nombre);
  const [cantidadFuncionarios, setCantidadFuncionarios] = useState(0);
  const [editingPerfil, setEditingPerfil] = useState(false);
  const [nuevo, setNuevo] = useState(false);
  if (perfilId) {
    console.log(nuevo);
  }
  useEffect(() => {
    if (estado === 'nuevo') {
      setEditingPerfil(true);
      setNuevo(true);
    }
  }, []);

  const handleCancelarClick = () => {
    if (!nombrePerfil) {
      navigate('/perfiles');
    }
    setEditingPerfil(false);
  };

  const handleGuardarClick = async () => {
    setEditingPerfil(false);
    setNuevo(false);
  };

  const handleNombreChange = (e) => {
    setNombrePerfil(e.target.default);
  };

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4
  };

  const [open, setOpen] = useState(false);

  return (
    <Stack padding={4}>
      <Typography variant="h4">Datos del perfil :</Typography>
      <Card elevation={4} sx={{ borderRadius: '20px', marginTop: 2 }}>
        <CardContent>
          <Stack direction="row" justifyContent="space-between">
            <Typography>Datos del perfil:</Typography>
            {!nuevo ? (
              <Button
                startIcon={<EditIcon />}
                onClick={() => {
                  setEditingPerfil(true);
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
                  disabled={!editingPerfil}
                  value={nombrePerfil}
                  onChange={handleNombreChange}
                  sx={{ borderRadius: 10 }}
                />
              </Grid>
            </Grid>
            <Stack direction="row">
              <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-end' }}>
                {editingPerfil && (
                  <Stack direction="row">
                    <Button
                      onClick={() => setOpen(true)}
                      variant="contained"
                      color="inherit"
                      sx={{ marginRight: 2, borderRadius: 5 }}>
                      {' '}
                      Cancelar{' '}
                    </Button>
                    <Modal
                      open={open}
                      onClose={() => setOpen(false)}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description">
                      <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                          CANCELAR
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                          ¿Estás seguro de que deseas cancelar este registro? Tus datos se perderán.
                        </Typography>
                        <Stack direction="row" justifyContent="flex-end">
                          <Button
                            color="inherit"
                            sx={{ m: 1, width: 100, color: 'inherit' }}
                            onClick={handleCancelarClick}>
                            Sí
                          </Button>
                          <Button
                            color="quaternary"
                            sx={{ m: 1, width: 200, color: 'quaternary' }}
                            onClick={() => setOpen(false)}>
                            Seguir editando
                          </Button>
                        </Stack>
                      </Box>
                    </Modal>
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

export default PerfilesEditing;
