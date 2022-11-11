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

const ServiciosTable = ({ rows }) => {
  // const { logout } = useAuth();
  const handleEditar = () => {
    console.log('editao');
  };
  const cols = [
    {
      field: 'perfil',
      headerName: 'Perfil',
      flex: 1,
      minWidth: 150
    },
    {
      field: 'vales',
      headerName: 'Vales/Turno',
      flex: 1,
      minWidth: 100
    },
    {
      field: 'valor',
      headerName: 'Valor',
      flex: 1,
      minWidth: 100
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
          sx={{
            borderRadius: 5,
            '.MuiDataGrid-columnSeparator': {
              display: 'none'
            },
            '&.MuiDataGrid-root': {
              border: 'none'
            }
          }}
        />
      )}
    </Box>
  );
};

export default ServiciosTable;