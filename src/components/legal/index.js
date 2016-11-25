import React from 'react';
import css from '../../lib/css';

require('./_legal.sass');

function Legal(props) {
  const {legalName, credit} = props;
  const compName = 'legal';

  return (
    <div className={css.block + compName}>
      <span className="credit">{credit}</span>
      <span className="copy">&copy; 2016 {legalName}. All rights reserved.</span>
    </div>
  );
}

export default Legal;
