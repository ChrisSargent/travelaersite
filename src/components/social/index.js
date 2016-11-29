import React from 'react';
import css from '../../lib/css';

import SVG from '../svg'

require('./_social.sass');

function Social(props) {
  const compName = 'social';

  const networkMap = props.socialNetworks.map((network, index) => {

    return (
      <li key={index} className={css.item}>
        <a href={network.link} target="_blank" className={css.link + compName}>
          <SVG type={network.iconType} />
        </a>
      </li>
    );
  });

  return (
    <div className={css.block + compName}>
      <h2 className={css.title}>Follow Us</h2>
      <ul className={css.list + compName}>
        {networkMap}
      </ul>
    </div>
  );
}
export default Social;
