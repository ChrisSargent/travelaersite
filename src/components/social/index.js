import React from 'react';
import css from '../../lib/css';

import SVG from '../svg'

import './_social.sass';

function Social(props) {
  const compName = 'social';
  const {socialNetworks, modifier} = props;
  var compClass = css.main + compName;

  if (!socialNetworks)
    return null;

  modifier && (compClass += ' -' + modifier);

  const networkMap = socialNetworks.map((network, index) => {

    return (
      <li key={index} className={css.item}>
        <a href={network.link} target="_blank" className={css.link + compName}>
          <SVG type={network.iconType.value} />
          <span className={css.label}>{network.iconType.label}</span>
        </a>
      </li>
    );
  });

  return (
    <div className={compClass}>
      <h2 className={css.title}>Connect with us on</h2>
      <ul className={css.list + compName}>
        {networkMap}
      </ul>
    </div>
  );
}
export default Social;
