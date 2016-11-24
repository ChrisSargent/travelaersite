import React from 'react';

require('./_close.sass');

function Close(props) {
  const {closeClick} = props;

  return (
    <button className="btn-close btn -clear" onClick={closeClick}>
      <span className="icon"></span>
      <span className="text">Close</span>
    </button>
  );
}

export default Close;
