import React from 'react';
import Icon from '../icons';
import css from '../../lib/css';

require('./_banner.sass');

function Banner(props) {
  const {logos, title} = props;

  const logoMap = logos.map((logo, index) => {
    return (
      <li key={index} className="item">
        <Icon type={logo.iconType} title={logo.iconTitle}/>
      </li>
    );
  });

  return (
    <section className="banner-section">
      <div className="logo-block">
        <h1 className={css.header}>{title}</h1>
        <ul className="logos">
          {logoMap}
        </ul>
      </div>
    </section>
  );
}

export default Banner;
