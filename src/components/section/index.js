import React from 'react';
import css from '../../lib/css';

function Section(props) {
  const {compName} = props;

  return (
    <section className={css.section + compName}>
      <div className={css.container}>
        {props.children}
      </div>
    </section>
  );
}

export default Section;
