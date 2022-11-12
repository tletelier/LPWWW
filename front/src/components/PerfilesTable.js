/* eslint-disable react/prop-types */
/* eslint-disable max-len */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
import { Button, Theme, Stack, Box, Typography, Modal } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
// import axios from 'axios';
// import { useAuth } from '../hooks/useAuth';
import SinContenido from './SinContenido';
// import { useAuth } from '../hooks/useAuth';
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

const PerfilesTable = ({ rows }) => {
  const navigate = useNavigate();
  const handleVer = (nombre) => {
    navigate(`/perfil/${nombre}`);
  };
  const cols = [
    {
      field: 'nombre',
      headerName: 'Nombre',
      flex: 1,
      minWidth: 150
    },
    {
      field: 'cantidad',
      headerName: 'Cantidad',
      flex: 1,
      minWidth: 100
    },
    {
      field: 'personas',
      headerName: 'Personas',
      flex: 1,
      renderCell: (params) => {
        const onVerClick = (e) => {
          handleVer(params.row.nombre);
        };
        return (
          <div>
            <Button
              variant="outlined"
              sx={{ width: 100, borderRadius: 20, textTransform: 'none', color: '#7C898B', m: 1 }}
              onClick={() => onVerClick(params)}>
              Ver
            </Button>
          </div>
        );
      }
    },
    {
      field: 'acción',
      headerName: 'Acción',
      // align: 'center',
      headerAlign: 'center',
      flex: 1,
      minWidth: 250,
      sortable: false,
      renderCell: (params) => {
        const [open, setOpen] = React.useState(false);
        const handleEditClick = () => {
          navigate(`/perfiles/${params.row._id}/${params.row.nombre}`);
        };
        const handleDeleteClick = () => setOpen(true);
        return (
          <Stack direction="row">
            <Button
              variant="outlined"
              sx={{
                width: 100,
                borderRadius: 20,
                borderColor: 'red',
                textTransform: 'none',
                color: 'red',
                m: 1
              }}
              onClick={handleDeleteClick}>
              Eliminar
            </Button>
            <Modal
              open={open}
              onClose={() => setOpen(false)}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description">
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  ELIMINAR
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  ¿Estás seguro de que deseas eliminar este registro?
                </Typography>
                <Stack direction="row" justifyContent="flex-end">
                  <Button variant="claro" sx={{ m: 1, width: 100 }} onClick={() => setOpen(false)}>
                    Cancelar
                  </Button>
                  <Button
                    variant="contained"
                    sx={{
                      m: 1,
                      width: 100,
                      backgroundColor: '#EA6A6A',
                      color: '#FFFFFF',
                      borderRadius: 20,
                      textTransform: 'none',
                      '&:hover': {
                        backgroundColor: '#f9b3b3',
                        color: '#FFFFFF'
                      }
                    }}
                    onClick={() => handleDeleteClick(params)}>
                    Eliminar
                  </Button>
                </Stack>
              </Box>
            </Modal>
            <Button variant="claro" onClick={() => handleEditClick()} sx={{ m: 1, width: 100 }}>
              Editar
            </Button>
          </Stack>
        );
      }
    }
  ];
  return (
    <Box sx={{ width: '100%' }}>
      {rows.length === 0 ? (
        <SinContenido mainmsg="Sin perfiles." submsg="Cuando hayan, estos aparecerán aquí." />
      ) : (
        <DataGrid
          density="comfortable"
          getRowHeight={() => 'auto'}
          autoHeight
          hideFooter
          columns={cols}
          getRowId={(row) => row._id}
          rows={Object.values(rows)}
          disableSelectionOnClick
          sx={{ borderRadius: 5, paadingLeft: 2, paddingRight: 2 }}
        />
      )}
    </Box>
  );
};

export default PerfilesTable;
