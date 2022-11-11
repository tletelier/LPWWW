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
import SinContenido from './SinContenido';
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
              sx={{ width: 100, borderRadius: 20, textTransform: 'none', color: '#7C898B', m: 1 }}
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
      // align: 'center',
      headerAlign: 'center',
      flex: 1,
      minWidth: 250,
      sortable: false,
      renderCell: (params) => {
        const onClick = (e) => {
          handleEditar(params.row._id);
        };
        return (
          <Stack direction="row">
            <Button
              variant="outlined"
              sx={{ width: 100, borderRadius: 20, textTransform: 'none', color: 'red', m: 1 }}
              onClick={() => onClick(params)}>
              Eliminar
            </Button>
            <Button variant="claro" onClick={() => onClick(params)} sx={{ m: 1, width: 100 }}>
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
