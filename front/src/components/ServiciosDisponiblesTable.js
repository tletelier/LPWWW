/* eslint-disable react/prop-types */
/* eslint-disable max-len */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
import { Button, Theme, Stack, Box, Typography, Modal, Card } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
// import axios from 'axios';
import SinContenido from './SinContenido';

// const handleVer = (row) => {
//   const [dataVale] = useState(JSON.stringify(row));
//   console.log(dataVale);
//   // useEffect(() => {
//   //   localStorage.setItem('dataVale', dataVale);
//   // }, []);
// };

const ServiciosDisponiblesTable = ({ rows }) => {
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
        const [open, setOpen] = React.useState(false);
        const handleVerClick = () => setOpen(true);
        console.log(params.row);
        return (
          <div>
            <Modal
              open={open}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              onClose={() => setOpen(false)}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description">
              <Stack spacing={3} sx={{ px: 3, mr: 5 }}>
                <Card sx={{ backgroundColor: '#F6F4F1', p: 4, borderRadius: 5 }}>
                  <Stack spacing={2} sx={{ m: 2 }}>
                    <Typography variant="h4" align="center" sx={{ color: '#000', m: 3 }}>
                      <b>N° Vale: {params.row.vale}</b>
                    </Typography>
                    <Typography sx={{ color: '#000' }}>
                      <b>FECHA</b> :{/* {params.row.fecha} */}
                    </Typography>
                    <Typography sx={{ color: '#000' }}>
                      <b>HORA</b> :{/* {params.row.hora} */}
                    </Typography>
                    <Typography sx={{ color: '#000' }}>
                      <b>CODIGO</b> :{/* {params.row.user.codigo} */}
                    </Typography>
                    <Typography sx={{ color: '#000' }}>
                      <b>FUNCIONARIO</b> :
                      {/* params.row.user.nombres} {params.row.user.apellidos} */}
                    </Typography>
                    <Typography sx={{ color: '#000' }}>
                      <b>SERVICIO</b> :{/* {params.row.user.servicios} */}
                    </Typography>
                    <Typography sx={{ color: '#000' }}>
                      <b>PERFIL</b> :{/* {params.row.user.perfil} */}
                    </Typography>
                    <Typography variant="h6" align="center" sx={{ color: '#000', m: 2 }}>
                      <b>VALOR</b> :{/* {params.row.cantidad} */}
                    </Typography>
                  </Stack>
                  <Stack
                    direction="row"
                    spacing={2}
                    sx={{ justifyContent: 'center', marginTop: 5 }}>
                    <Button variant="claro" onClick={() => setOpen(false)}>
                      Cancelar
                    </Button>
                    <Button variant="oscuro">Emitir Vale</Button>
                  </Stack>
                </Card>
              </Stack>
            </Modal>
            <Button
              variant="outlined"
              disabled={
                params.row.perfiles[0].funcionario[0].valesUsados !==
                params.row.perfiles[0].valesPorTurno
              }
              onClick={handleVerClick}
              sx={{
                m: 1,
                color: '#784141',
                textTransform: 'none',
                borderRadius: 5,
                borderColor: '#784141'
              }}>
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
