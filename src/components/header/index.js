import React from 'react';
import Logo from '../logo';
import Nav from '../nav';

function Header() {

  return (
    <header className="site__hdr">
      <div className="cont--xl">
        <Logo/>
        <Nav location="primary"/>
      </div>
    </header>
  );
}

export default Header;
