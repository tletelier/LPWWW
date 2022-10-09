import React from 'react';
import { Outlet } from 'react-router-dom';
import ResponsiveDrawer from './ResponsiveDrawer';

const Layout = () => (
  <ResponsiveDrawer>
    <Outlet />
  </ResponsiveDrawer>
);

export default Layout;
