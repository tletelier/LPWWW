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
import SinContenido from './SinContenido';
// import axios from 'axios';
// import { useAuth } from '../hooks/useAuth';
// import SinActividades from './SinActividades';
// import { useAuth } from '../hooks/useAuth';

const ServiciosTable = ({ rows }) => {
  // const { logout } = useAuth();
  const handleEditar = () => {
    console.log('editao');
  };
  const cols = [
    {
      field: 'id',
      headerName: 'ID',
      flex: 1,
      minWidth: 150
    },
    {
      field: 'administrador',
      headerName: 'Administrador',
      flex: 1,
      minWidth: 150
    },
    {
      field: 'fecha',
      headerName: 'Fecha',
      flex: 1,
      minWidth: 150
    },
    {
      field: 'archivo',
      headerName: 'Archivo',
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
            <Button variant="claro" onClick={() => onClick(params)} sx={{ m: 1 }}>
              Descargar
            </Button>
          </div>
        );
      }
    }
  ];
  return (
    <Box sx={{ width: '100%' }}>
      {rows.length === 0 ? (
        <SinContenido mainmsg="Sin servicios." submsg="Cuando hayan, estos aparecerán aquí." />
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
          sx={{ borderRadius: 5, paddingLeft: 2, paddingRight: 2 }}
        />
      )}
    </Box>
  );
};

export default ServiciosTable;
