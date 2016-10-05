import React from 'react';
import Icon from '../icons'

function Links(props) {
  const linkMap = props.externalLinks.map((link, index) => {

    return (
      <li key={index}>
        <a href={link.link} target="_blank">
          <Icon type={link.iconType} title={link.iconTitle}/>
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
