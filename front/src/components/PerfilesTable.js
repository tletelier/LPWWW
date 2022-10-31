/* eslint-disable react/prop-types */
/* eslint-disable max-len */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
import { Button, Theme, Stack, Box, Typography } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
// import axios from 'axios';
// import { useAuth } from '../hooks/useAuth';
// import SinActividades from './SinActividades';
// import { useAuth } from '../hooks/useAuth';

const PerfilesTable = ({ rows }) => {
  // const { logout } = useAuth();
  const handleEditar = () => {
    console.log('editao');
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
        const onClick = (e) => {
          handleEditar(params.row._id);
        };
        return (
          <div>
            <Button
              variant="outlined"
              sx={{ width: 200, borderRadius: 20, textTransform: 'none', color: '#7C898B', m: 1 }}
              onClick={() => onClick(params)}>
              Ver
            </Button>
          </div>
        );
      }
    },
    {
      field: 'acción',
      headerName: 'Acción',
      align: 'center',
      headerAlign: 'center',
      flex: 1,
      minWidth: 150,
      sortable: false,
      renderCell: (params) => {
        const onClick = (e) => {
          handleEditar(params.row._id);
        };
        return (
          <div>
            <Button
              variant="outlined"
              sx={{ width: 200, borderRadius: 20, textTransform: 'none', color: 'red', m: 1 }}
              onClick={() => onClick(params)}>
              Eliminar
            </Button>
            <Button variant="claro" onClick={() => onClick(params)} sx={{ m: 1 }}>
              Editar
            </Button>
          </div>
        );
      }
    }
  ];
  return (
    <Box sx={{ width: '100%' }}>
      {rows.length === 0 ? (
        // <SinActividades
        //   mainmsg="Sin servicios."
        //   submsg="Cuando hayan, estos aparecerán aquí."
        // />
        <Stack> nada por aqui</Stack>
      ) : (
        <DataGrid
          density="comfortable"
          getRowHeight={() => 'auto'}
          autoHeight
          hideFooter
          columns={cols}
          rows={Object.values(rows)}
          disableSelectionOnClick
          sx={{ borderRadius: 5 }}
        />
      )}
    </Box>
  );
};

export default PerfilesTable;
