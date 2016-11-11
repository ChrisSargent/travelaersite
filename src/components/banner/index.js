import React from 'react';
import Icon from '../icons';

require('./_banner.sass');

function Banner(props) {
  const {logos, title} = props;

  const logoMap = logos.map((logo, index) => {
    return (
      <li key={index}>
        <Icon type={logo.iconType} title={logo.iconTitle}/>
      </li>
    );
  });

  return (
    <section className="banner">
      <div className="cont--l">
        <h1>{title}</h1>
        <ul>
          {logoMap}
        </ul>
      </div>
    </section>
  );
}

export default Banner;
