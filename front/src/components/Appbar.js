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
import { Outlet } from 'react-router-dom';

const pages = ['Cerrar Sesión'];

const Appbar = () => {
  // const { user, logout } = useAuth();
  const user = { nombres: 'Skylar', apellidos: 'Cirrus', codigo: 265 };
  const handleLogout = async () => {
    console.log('logout fake');
    // try {
    //   const res = await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/logout`);
    //   console.log(res);
    //   logout();
    // } catch (e) {
    //   console.log(e);
    // }
  };
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleClick = () => {
    console.log('logout');
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
              sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' }, justifyContent: 'flex-end' }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                // color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right'
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' }
                }}>
                {pages.map((page) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
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
