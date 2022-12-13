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
import SinContenido from './SinContenido';

const PerfilesTable = ({ rows }) => {
  const navigate = useNavigate();
  const handleVer = (nombre) => {
    navigate(`/perfil/${nombre}`);
  };
  const cols = [
    {
      field: 'nombres',
      headerName: 'Nombre',
      flex: 1,
      minWidth: 150
    },
    {
      field: 'apellidos',
      headerName: 'Apellido',
      flex: 1,
      minWidth: 150
    },
    {
      field: 'codigoFuncionario',
      headerName: 'Codigo',
      flex: 1,
      minWidth: 150
    },
    {
      field: 'correo',
      headerName: 'Correo',
      flex: 1,
      minWidth: 150
    },
    {
      field: 'estado',
      headerName: 'Estado',
      flex: 1,
      minWidth: 150,
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
              Activo
            </Button>
          </div>
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
          getRowId={(row) => row.id}
          rows={Object.values(rows)}
          disableSelectionOnClick
          sx={{ borderRadius: 5, paadingLeft: 2, paddingRight: 2 }}
        />
      )}
    </Box>
  );
};

export default PerfilesTable;
