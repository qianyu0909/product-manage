import Head from '../head';
import './index.css'

import React from 'react';

const Layout = ({ children }: { children: any }) => {
  return (
    <div className="c-layout" >
      <Head></Head>
      <div className="content">
        <div className="layout-page">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
