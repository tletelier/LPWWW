/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import {
  Grid,
  TextField,
  Paper,
  Button,
  Alert,
  Stack,
  Typography,
  Select,
  MenuItem,
  SelectChangeEvent,
  FormControl,
  Card,
  InputLabel
} from '@mui/material';
import ProductosTable from '../components/ProductosTable';

const data = [
  {
    _id: 'sdfsd',
    id: 165,
    producto: 'Manzana',
    precio: 350
  },
  {
    _id: 'sdfsxdfgsdd',
    id: 16155,
    producto: 'Galletas Crakers',
    precio: 550
  },
  {
    _id: 'sddfgdfgfsd',
    id: 15,
    producto: 'Té Ceylan',
    precio: 300
  }
];

const CajeroView = () => {
  const [vale, setVale] = useState(1350);
  const [cantidad, setCantidad] = useState(1350);
  const [item, setItem] = useState(1350);
  const [fecha, setFecha] = useState('05/05/2020 08:00');
  const [sucursal, setSucursal] = useState('(02) Azucenas');
  const [total, setTotal] = useState(350);
  const handleValeChange = (event) => {
    setVale(event.target.value);
  };
  const handleItemChange = (event) => {
    setItem(event.target.value);
  };
  return (
    <Grid container spacing={0}>
      <Grid item xs={12} sm={6} md={6}>
        <Stack direction="column" spacing={2}>
          <Stack spacing={3} sx={{ px: 3 }}>
            <Stack direction="row" spacing={5} sx={{ justifyContent: 'center' }}>
              <Typography align="left">Sucursal: {sucursal}</Typography>
              <Typography align="right">Fecha: {fecha}</Typography>
            </Stack>
            <Card sx={{ backgroundColor: '#F6F4F1', p: 2, borderRadius: 5 }}>
              <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                <Typography sx={{ color: '#784141', textAlign: 'center', width: 200 }}>
                  <b>Agregar Item</b>
                </Typography>
                <TextField
                  sx={{ width: 1, backgroundColor: '#FFF' }}
                  required
                  label="Ej: 1253"
                  onChange={handleItemChange}
                />
              </Stack>
              <Stack direction="row" justifyContent="flex-end" sx={{ mt: 2 }}>
                <Button variant="claro">Agregar</Button>
              </Stack>
            </Card>
            <Stack sx={{ py: 2, minWidth: 300 }}>
              <ProductosTable rows={data} />
            </Stack>
          </Stack>
        </Stack>
      </Grid>
      <Grid item xs={12} sm={6} md={6}>
        <Stack spacing={3} sx={{ px: 3 }}>
          <Card sx={{ backgroundColor: '#F6F4F1', p: 4, borderRadius: 5 }}>
            <Typography variant="h5" sx={{ color: '#784141' }}>
              <b>TOTAL PRODUCTOS</b>
            </Typography>
            <Typography variant="h4" align="right" sx={{ color: '#000' }}>
              <b>${cantidad}</b>
            </Typography>
          </Card>
          <Card sx={{ backgroundColor: '#F6F4F1', p: 4, borderRadius: 5 }}>
            <Typography variant="h6" sx={{ color: '#000', alignSelf: 'right' }}>
              <b>N° Vale*</b>
            </Typography>
            <TextField
              sx={{ width: 1, backgroundColor: '#FFF' }}
              required
              label="Ej: 12533"
              onChange={handleValeChange}
            />
          </Card>
          <Card sx={{ backgroundColor: '#F6F4F1', p: 4, borderRadius: 5 }}>
            <Typography variant="h5" sx={{ color: '#784141' }}>
              <b>TOTAL A PAGAR</b>
            </Typography>
            <Typography variant="h3" align="right" sx={{ color: '#000' }}>
              <b>${total}</b>
            </Typography>
          </Card>
          <Stack direction="row" spacing={2} sx={{ justifyContent: 'center' }}>
            <Button variant="outlined" sx={{ width: 200, borderRadius: 20, textTransform: 'none' }}>
              Cancelar
            </Button>
            <Button variant="oscuro">Registrar Venta</Button>
          </Stack>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default CajeroView;
