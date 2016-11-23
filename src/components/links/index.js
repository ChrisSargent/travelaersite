import React from 'react';
import css from '../../lib/css';

require('./_links.sass');

function Links(props) {
  const linkMap = props.externalLinks.map((link, index) => {

    return (
      <li key={index} className="item">
        <a className="ext-link" href={link.external_link} target="_blank">
          <img src={link.external_logo} alt="" />
        </a>
      </li>
    );
  });

  return (
    <div className="extlinks-block">
      <h2 className={css.title}>Awards</h2>
      <ul className="extlinks-list">
        {linkMap}
      </ul>
    </div>
  );
}

export default Links;
