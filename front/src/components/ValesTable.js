/* eslint-disable react/prop-types */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
import { Button, Theme, Stack, Box, Typography, Card } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
// import axios from 'axios';
import SinContenido from './SinContenido';

const ServiciosTable = ({ rows }) => {
  const navigate = useNavigate();
  const cols = [
    {
      field: 'nombre',
      headerName: 'Perfil',
      flex: 1,
      minWidth: 150
    },
    {
      field: 'valesPorTurno',
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
        const handleEditClick = () => {
          navigate(
            `/vales/${params.row._id}/${params.row.nombre}/${params.row.valesPorTurno}/${params.row.valor}`
          );
        };
        return (
          <div>
            <Button variant="claro" onClick={() => handleEditClick()} sx={{ m: 1 }}>
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
        <Card elevation={2} sx={{ p: 2, borderRadius: 5 }}>
          <SinContenido
            mainmsg="Sin perfiles asociados."
            submsg="Cuando hayan, estos aparecerán aquí."
          />
        </Card>
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
          sx={{
            paddingLeft: 2,
            paddingRight: 2,
            borderRadius: 5
            // '.MuiDataGrid-columnSeparator': {
            //   display: 'none'
            // },
            // '&.MuiDataGrid-root': {
            //   border: 'none'
            // }
          }}
        />
      )}
    </Box>
  );
};

export default ServiciosTable;
