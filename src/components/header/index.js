import React from 'react';
import Logo from '../logo';
import Nav from '../nav';
import css from '../../lib/css';

require('./_header.sass');

function SiteHeader() {

  return (
    <header className="site-header">
      <div className={css.container}>
        <Logo/>
        <Nav location="primary"/>
      </div>
    </header>
  );
}

export default SiteHeader;
