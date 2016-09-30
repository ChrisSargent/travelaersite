import React from 'react';

function Social(props) {
  const networkMap = props.socialNetworks.map((network, index) => {
    var classList = 'i--' + network.iconClass;
    return (
      <li key={index}>
        <a href={network.link} target="_blank">
          <i className={classList} aria-hidden="true"></i>
          <span className="i__text">{network.iconText}</span>
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
