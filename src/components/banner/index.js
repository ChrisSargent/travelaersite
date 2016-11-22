import React from 'react';
import css from '../../lib/css';

require('./_banner.sass');

function Banner(props) {
  const {logos, title} = props;

  const logoMap = logos.map((logo, index) => {
    return (
      <li key={index} className="item">
        <img src={logo.logo_image} alt={logo.logo_name} className="banner-image"/>
      </li>
    );
  });

  return (
    <section className="banner-section">
      <div className="banner-block">
        <h1 className={css.header}>{title}</h1>
        <ul className="banner-list">
          {logoMap}
        </ul>
      </div>
    </section>
  );
}

export default Banner;
