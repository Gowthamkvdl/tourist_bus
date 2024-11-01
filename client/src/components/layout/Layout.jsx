import React from 'react'
import {Outlet} from 'react-router-dom'
import Navbar from '../navbar/Navbar'
import TopBanner from '../topBanner/TopBanner';

const Layout = () => {
  return (
    <div className="container">
      <Navbar />
      <div className="mt-md-5"></div>
      <Outlet />
    </div>
  );
}

export default Layout
