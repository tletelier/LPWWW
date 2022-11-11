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

const ProductoTable = ({ rows }) => {
  // const { logout } = useAuth();
  const handleEditar = () => {
    console.log('editao');
  };
  const cols = [
    {
      field: 'id',
      headerName: 'ID',
      flex: 1,
      minWidth: 100
    },
    {
      field: 'producto',
      headerName: 'Producto',
      flex: 1,
      minWidth: 150
    },
    // {
    //   field: 'servicio',
    //   headerName: 'Servicio',
    //   flex: 1,
    //   minWidth: 150
    // },
    {
      field: 'precio',
      headerName: 'Precio',
      flex: 1,
      minWidth: 100,
      renderCell: (params) => {
        <div>${params.row.precio}</div>;
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
          sx={{ borderRadius: 5, paddingLeft: 2, paddingRight: 2 }}
        />
      )}
    </Box>
  );
};

export default ProductoTable;
