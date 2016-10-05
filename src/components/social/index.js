import React from 'react';
import Icon from '../icons'

function Social(props) {
  const networkMap = props.socialNetworks.map((network, index) => {

    return (
      <li key={index}>
        <a href={network.link} target="_blank">
          <Icon type={network.iconType} title={network.iconTitle} />
        </a>
      </li>
    );
  });

  return (
    <div className="social">
      <h2>Follow Us</h2>
      <ul>
        {networkMap}
      </ul>
    </div>
  );
}
export default Social;
