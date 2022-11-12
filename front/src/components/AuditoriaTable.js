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

const AuditoriaTable = ({ rows }) => {
  const navigate = useNavigate();

  const cols = [
    {
      field: '_id',
      headerName: 'ID',
      flex: 0.5,
      minWidth: 100
    },
    {
      field: 'funcionario',
      headerName: 'Funcionario',
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
      field: 'saldo',
      headerName: 'Saldo',
      flex: 1,
      minWidth: 150
    },
    {
      field: 'cajero',
      headerName: 'Cajero',
      flex: 1,
      minWidth: 150
    },
    {
      field: 'sucursal',
      headerName: 'Sucursal',
      flex: 1,
      minWidth: 150
    },
    {
      field: 'estado',
      headerName: 'Estado',
      flex: 1,
      minWidth: 150,
      renderCell: (params) => {
        return (
          <div>
            <Button
              variant="outlined"
              sx={{ width: 100, borderRadius: 20, textTransform: 'none', color: '#7C898B', m: 1 }}>
              Emitido
            </Button>
          </div>
        );
      }
    }
  ];
  return (
    <Box sx={{ width: '100%' }}>
      {rows.vales.length === 0 ? (
        <SinContenido mainmsg="Sin perfiles." submsg="Cuando hayan, estos aparecerán aquí." />
      ) : (
        <DataGrid
          density="comfortable"
          getRowHeight={() => 'auto'}
          autoHeight
          hideFooter
          columns={cols}
          getRowId={(row) => row._id}
          rows={Object.values(rows.vales)}
          disableSelectionOnClick
          sx={{ borderRadius: 5, paadingLeft: 2, paddingRight: 2 }}
        />
      )}
    </Box>
  );
};

export default AuditoriaTable;
