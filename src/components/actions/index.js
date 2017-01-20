import React from 'react';
import css from '../../lib/css';
import stripDomain from '../../lib/strip-domain';
import {Link} from 'react-router';

import './_actions.sass';

function Actions(props) {
  const {actions} = props;
  const compName = 'actions';

  if (!actions)
    return;

  const actionsMap = actions.map((action, index) => {
    var btnClass;
    const url = stripDomain(action.linkTo);

    btnClass = css.btn;
    action.modifier && (btnClass += ' -' + action.modifier);

    if (action.param) {
      return <button key={index} className={btnClass} type="button" data-actionparam={action.param}>{action.linkTitle}</button>
    } else if (action.submit) {
      return <button key={index} className={btnClass} type="submit">{action.linkTitle}</button>
    } else {
      return <Link key={index} to={url} className={btnClass}>{action.linkTitle}</Link>
    }
  });

  return (
    <footer className={css.footer + compName}>
      {actionsMap}
    </footer>
  )

}

export default Actions;
