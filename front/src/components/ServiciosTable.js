/* eslint-disable react/prop-types */
import { Button, Box, Card } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
// import axios from 'axios';
import SinContenido from './SinContenido';

const ServiciosTable = ({ rows }) => {
  const navigate = useNavigate();
  const cols = [
    {
      field: 'nombre',
      headerName: 'Nombre',
      flex: 1,
      minWidth: 150
    },
    {
      field: 'horarioInicio',
      headerName: 'Comienzo',
      flex: 1,
      minWidth: 100
    },
    {
      field: 'horarioFin',
      headerName: 'Finaliza',
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
            `/servicios/${params.row._id}/${params.row.nombre}/${params.row.horarioInicio}/${params.row.horarioFin}`
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
          <SinContenido mainmsg="Sin perfiles." submsg="Cuando hayan, estos aparecerán aquí." />
        </Card>
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
          sx={{ borderRadius: 5, paddingLeft: 2, paddingRight: 2 }}
        />
      )}
    </Box>
  );
};

export default ServiciosTable;
