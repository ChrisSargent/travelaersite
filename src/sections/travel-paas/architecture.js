import React from 'react';
import css from '../../lib/css';

function Architecture(props) {
  const {compName} = props;
  console.log(props);
  return (
    <div className={css.main + compName}>
      Test
    </div>
  );
}

export default Architecture;
