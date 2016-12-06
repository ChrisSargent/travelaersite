import React from 'react';
import css from '../../lib/css';
import Image from '../image';

require('./_banner.sass');

function Banner(props) {
  const {logos, title} = props;
  const compName = 'banner';

  const logoMap = logos.map((logo, index) => {

    return (
      <li key={index} className={css.item}>
        <Image image={logo.logo_image} alt={logo.logo_name} srcVersion="medium" sizes="20vw"/>
      </li>
    );
  });

  return (
    <section className={css.section + compName}>
      <div className={css.content + compName}>
        <h1 className={css.title}>{title}</h1>
        <ul className={css.list + compName}>
          {logoMap}
        </ul>
      </div>
    </section>
  );
}

export default Banner;
