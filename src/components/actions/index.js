import React from 'react';
import css from '../../lib/css';
import stripDomain from '../../lib/strip-domain';
import {Link} from 'react-router';

require('./_actions.sass');

function Actions(props) {
  const {actions, modifier} = props;
  const compName = 'actions';
  var actionsMap, btnClass;
  btnClass = css.btn;
  modifier && (btnClass += ' -' + modifier);

  if (actions) {
    actionsMap = actions.map((action, index) => {
      const url = stripDomain(action.linkTo);

      if(action.onClick) {
        return <button key={index} className={btnClass} data-actionparam={action.param} onClick={action.onClick}>{action.linkTitle}</button>
      } else {
        return <Link key={index} to={url} className={btnClass}>{action.linkTitle}</Link>
      }
    });

    return (
      <footer className={css.footer + compName}>
        {actionsMap}
      </footer>
    )
  } else {
    return false;
  }
}

export default Actions;
