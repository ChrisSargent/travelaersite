import React from 'react';
import css from '../../lib/css';
import RespImage from '../resp-image';

require('./_banner.sass');

function Banner(props) {
  const {logos, title, compName} = props;

  const logoMap = logos.map((logo, index) => {

    return (
      <li key={index} className={css.item}>
        <RespImage image={logo} srcVersion="medium" respSizes="20vw"/>
      </li>
    );
  });

  return (
    <div className={css.main + compName}>
      <h1 className={css.title}>{title}</h1>
      <ul className={css.list + compName}>
        {logoMap}
      </ul>
    </div>
  );
}

export default Banner;
