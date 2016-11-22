import React from 'react';

require('./_close.sass');

function Close(props) {
  const {close} = props;
  console.log(close);

  return (
    <button className="btn-close btn -clear" onClick={close.bind(null, false)}>
      <span className="icon"></span>
      <span className="text">Close</span>
    </button>
  );
}

export default Close;
