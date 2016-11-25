import React from 'react';
import css from '../../lib/css';

require('./_close.sass');

function Close(props) {
  const {closeClick} = props;
  const compName = 'close';

  return (
    <button className={css.btn + '-' +compName} onClick={closeClick}>
      <span className="icon"></span>
      <span className="text">Close</span>
    </button>
  );
}

export default Close;
