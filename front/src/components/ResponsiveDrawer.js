import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import HomeIcon from '@mui/icons-material/Home';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { NavLink, Link, useMatch, useNavigate } from 'react-router-dom';
// import { Theme } from '@mui/material/styles';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { Menu, MenuItem } from '@mui/material';
// import axios from 'axios';
// import _ from 'lodash';
// import { useAuth } from '../hooks/useAuth';

import logo from '../assets/logo.png';

const drawerWidth = 250;

const ResponsiveDrawer = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  // const { user, logout } = useAuth();
  const user = { nombres: 'Skylar', apellidos: 'Cirrus' };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const items = [
    {
      uid: 1,
      text: 'Gestionar Vales',
      icon: <HomeIcon />,
      path: '/vales',
      visible: true
    },
    {
      uid: 2,
      text: 'Gestionar Perfiles',
      icon: <HomeIcon />,
      path: '/perfiles',
      visible: true
    },
    {
      uid: 3,
      text: 'Gestionar Servicios',
      icon: <HomeIcon />,
      path: '/servicios',
      visible: true
    },
    {
      uid: 4,
      text: 'Gestionar Auditoria',
      icon: <HomeIcon />,
      path: '/auditoria',
      visible: true
    }
  ];

  let seccionActual = 'Pagina no encontrada';

  const drawer = (
    <>
      <Link to="/">
        <img src={logo} alt="logo" width={drawerWidth - 10} />
      </Link>
      <Divider />
      <List
        sx={{
          // selected and (selected + hover) states
          '&& .Mui-selected, && .Mui-selected:hover': {
            bgcolor: (theme) => theme.palette.secondary.main
          },
          // hover states
          '& .MuiListItemButton-root:hover': {
            bgcolor: (theme) => theme.palette.secondary.light
          }
        }}>
        {items.map(({ uid, text, icon, path, visible }) => {
          const active = useMatch({ path: `${path}/*` }) !== null;
          if (active) seccionActual = text;
          if (!visible) return '';
          return (
            <ListItem disablePadding button component={NavLink} to={path} key={uid}>
              <ListItemButton selected={active}>
                <ListItemIcon sx={{ color: (theme) => theme.palette.primary.contrastText }}>
                  {icon}
                </ListItemIcon>
                <ListItemText>
                  <Typography sx={{ color: (theme) => theme.palette.primary.contrastText }}>
                    {text}
                  </Typography>
                </ListItemText>
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </>
  );

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

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

  return (
    <Box sx={{ display: 'flex', width: '100%' }}>
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` }
        }}
        color="inherit"
        elevation={3}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}>
            <MenuIcon />
          </IconButton>

          <IconButton color="inherit" edge="start" onClick={handleBack}>
            <ArrowBackIcon />
          </IconButton>

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {seccionActual}
          </Typography>
          <>
            <Typography>{`${user?.nombres} ${user?.apellidos}`}</Typography>
            <IconButton onClick={handleClick}>
              <AccountCircle />
            </IconButton>
          </>
          <Menu
            id="demo-positioned-menu"
            aria-labelledby="demo-positioned-button"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'left'
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left'
            }}>
            <MenuItem
              onClick={() => {
                handleClose();
                handleLogout();
              }}>
              Logout
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="nav bar">
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          disableScrollLock
          ModalProps={{
            keepMounted: true // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
          }}
          PaperProps={{
            sx: {
              backgroundColor: (theme) => theme.palette.primary.main,
              color: (theme) => theme.palette.primary.contrastText
            }
          }}>
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
          }}
          open
          PaperProps={{
            sx: {
              backgroundColor: (theme) => theme.palette.primary.main,
              color: (theme) => theme.palette.primary.contrastText
            }
          }}>
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 0, width: { sm: `calc(100% - ${drawerWidth}px)` } }}>
        <Toolbar />
        {/* {children} */}
      </Box>
    </Box>
  );
};

export default ResponsiveDrawer;