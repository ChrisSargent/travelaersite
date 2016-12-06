import React from 'react';
import css from '../../lib/css';
import Image from '../image';

require('./_links.sass');

function Links(props) {
  const compName = 'links';
  const linkMap = props.externalLinks.map((link, index) => {

    return (
      <li key={index} className={css.item}>
        <a className="link" href={link.external_link} target="_blank">
          <Image image={link.external_logo} srcVersion='medium' sizes="130px"/>
        </a>
      </li>
    );
  });

  return (
    <div className={css.block + compName}>
      <h2 className={css.title}>Awards</h2>
      <ul className={css.list + compName}>
        {linkMap}
      </ul>
    </div>
  );
}

export default Links;
