import React from 'react';
import css from '../../lib/css';

require('./_links.sass');

function Links(props) {
  const compName = 'links';
  const linkMap = props.externalLinks.map((link, index) => {

    return (
      <li key={index} className={css.item}>
        <a className="link" href={link.external_link} target="_blank">
          <img src={link.external_logo} alt="" />
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
