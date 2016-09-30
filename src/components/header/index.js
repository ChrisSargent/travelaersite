import React from 'react';
import Logo from '../logo';
import Nav from '../nav';

function Header() {

  return (
    <header>
      <Logo/>
      <Nav location="primary"/>
    </header>
  );
}

export default Header;
