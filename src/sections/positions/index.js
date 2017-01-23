import React from 'react';
import css from '../../lib/css';
import Actions from '../../components/actions';
import Wysiwyg from '../../components/wysiwyg';

import './_positions.sass';

function Positions(props) {
  const {title, content, positions, actions, compName} = props;
  actions[0].modifier = 'cta';

  const positionMap = positions.map((position, index) => {
    return (
      <li key={index} className={css.item}>
        {position.position}
      </li>
    );
  });

  return (
    <div className={css.main + compName}>
      <h1 className={css.title}>{title}</h1>
      <Wysiwyg content={content} />
      <ul className={css.list + compName}>
        {positionMap}
      </ul>
      <Actions actions={actions} class/>
    </div>
  );
}

export default Positions;
