import React from 'react';
import css from '../../lib/css';
import {globals} from '../../lib/utils';
import RespImage from '../../components/resp-image';

import './_countries.sass';

function Countries(props) {
  const {countries, map, title, compName} = props;

  const countryMap = countries.map((country, index) => {

    return (
      <li key={index} className={css.item}>
        <img src={globals.flagsUrl + country.code + '.svg'} alt={country.code + ' flag'}/>
      </li>
    );
  });

  return (
    <div className={css.main + compName}>
      <h1 className={css.title}>{title}</h1>
      <ul className={css.list + compName}>
        {countryMap}
      </ul>
      <RespImage image={map} class='europe'/>
    </div>
  );
}

export default Countries;
