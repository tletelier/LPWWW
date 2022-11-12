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

const ServiciosDisponiblesTable = ({ rows }) => {
  const handleEditar = () => {
    console.log('editao');
  };
  const cols = [
    {
      field: 'nombre',
      headerName: 'Servicios',
      flex: 1,
      minWidth: 150
    },
    {
      field: 'cantidad',
      headerName: 'Cantidad',
      flex: 1,
      minWidth: 100,
      renderCell: (params) => {
        return (
          <div>
            {params.row.perfiles[0].funcionario[0].valesUsados} /{' '}
            {params.row.perfiles[0].valesPorTurno}
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
              Ver Vale
            </Button>
          </div>
        );
      }
    }
  ];
  return (
    <Box sx={{ width: '100%' }}>
      {rows.length === 0 ? (
        <SinContenido
          mainmsg="Sin servicios disponibles."
          submsg="Cuando hayan, estos aparecerán aquí."
        />
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

export default ServiciosDisponiblesTable;
