import React from 'react';

require('./_credit.sass');

function Credit(props) {

  return (
    <div className="credit-block">{props.text}</div>
  );
}

export default Credit;
