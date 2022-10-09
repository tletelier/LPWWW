/* eslint-disable react/prop-types */
/* eslint-disable max-len */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
import { Button, Theme, Box, Typography } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCrown } from '@fortawesome/free-solid-svg-icons';
// import axios from 'axios';
// import { useAuth } from '../hooks/useAuth';
import SinActividades from './SinActividades';
// import { useAuth } from '../hooks/useAuth';

const ServiciosTable = ({ rows }) => {
  // const { logout } = useAuth();
  const navigate = useNavigate();
  const handleEditar = () => {
    console.log('editao');
  };
  const cols = [
    {
      field: 'nombre',
      headerName: 'Nombre',
      flex: 1
    },
    {
      field: 'horarioInicio',
      headerName: 'Comienzo',
      flex: 1
    },
    {
      field: 'horarioFin',
      headerName: 'Finaliza',
      flex: 1
    },
    {
      field: 'acción',
      headerName: 'Acción',
      flex: 1,
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
        <SinActividades
          mainmsg="Sin servicios."
          submsg="Cuando hayan claro, estos aparecerán aquí."
        />
      ) : (
        <DataGrid
          density="comfortable"
          getRowHeight={() => 'auto'}
          autoHeight
          hideFooter
          columns={cols}
          rows={Object.values(rows)}
          getRowId={(row) => row._id}
          disableSelectionOnClick
          sx={{ borderRadius: 5 }}
        />
      )}
    </Box>
  );
};

export default ServiciosTable;
