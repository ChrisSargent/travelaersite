import React from 'react';
import Icon from '../icons'

require('./_social.sass');

function Social(props) {
  const networkMap = props.socialNetworks.map((network, index) => {

    return (
      <li key={index} className="item">
        <a href={network.link} target="_blank">
          <Icon type={network.iconType} title={network.iconTitle} />
        </a>
      </li>
    );
  });

  return (
    <div className="social-block">
      <h2 className="title">Follow Us</h2>
      <ul className="social-list">
        {networkMap}
      </ul>
    </div>
  );
}
export default Social;
