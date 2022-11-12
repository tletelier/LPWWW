/* eslint-disable no-nested-ternary */
/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import {
  AppBar,
  Button,
  Stack,
  Theme,
  Typography,
  Toolbar,
  Box,
  Card,
  SvgIcon,
  Grid,
  CardMedia,
  MenuItem,
  Menu,
  Container,
  IconButton
} from '@mui/material';
import AdbIcon from '@mui/icons-material/Adb';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import logo from '../assets/logo2.png';
import { Outlet, useNavigate } from 'react-router-dom';

const Appbar = () => {
  const user = { nombres: 'Skylar', apellidos: 'Cirrus', codigo: 265 };
  const navigate = useNavigate();
  const handleLogout = () => {
    console.log('logout fake');
    navigate('/login');
  };
  const [anchorEl, setAnchorEl] = useState(false);
  const handleClick = () => {
    setAnchorEl(true);
  };
  const handleClose = () => {
    setAnchorEl(false);
  };
  return (
    <Box>
      <AppBar
        position="static"
        sx={{
          backgroundColor: (theme) => theme.palette.primary.contrastText
        }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
            <Box
              component="img"
              src={logo}
              alt="logo"
              sx={{
                height: 70
              }}
            />
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: 'none', md: 'flex' },
                justifyContent: 'flex-end',
                alignItems: 'center'
              }}>
              <Typography>{`(${user?.codigo}) ${user?.nombres} ${user?.apellidos}`}</Typography>
              <IconButton onClick={handleClick}>
                <AccountCircle />
              </IconButton>
              <Menu
                id="demo-positioned-menu"
                aria-labelledby="demo-positioned-button"
                anchorEl={anchorEl}
                open={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}>
                <MenuItem
                  onClick={() => {
                    handleClose();
                    handleLogout();
                  }}>
                  Cerrar Sesión
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Box component="main" sx={{ flexGrow: 1, py: 4 }}>
        <Outlet />
      </Box>
    </Box>
  );
};
export default Appbar;
