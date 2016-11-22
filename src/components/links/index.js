import React from 'react';
import Icon from '../icons'

require('./_links.sass');

function Links(props) {
  const linkMap = props.externalLinks.map((link, index) => {

    return (
      <li key={index}>
        <a href={link.link} target="_blank">
          <Icon type={link.iconType} />
        </a>
      </li>
    );
  });

  return (
    <div className="links--ext">
      <h2>Awards</h2>
      <ul>
        {linkMap}
      </ul>
    </div>
  );
}

export default Links;
