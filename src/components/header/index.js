import React from 'react';
import Logo from '../logo';
import Nav from '../nav';

require('./_header.sass');

function SiteHeader() {

  return (
    <header className="site-header">
      <div className="header">
        <Logo/>
        <Nav location="primary"/>
      </div>
    </header>
  );
}

export default SiteHeader;
