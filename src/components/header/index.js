import React from 'react';
import css from '../../lib/css';

import Logo from '../logo';
import Nav from '../nav';

require('./_header.sass');

function SiteHeader() {
  const compName = 'siteheader';

  return (
    <header className={css.header + compName}>
      <div className={css.container}>
        <Logo/>
        <Nav location="primary"/>
      </div>
    </header>
  );
}

export default SiteHeader;
