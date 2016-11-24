import React from 'react';
import {Link} from 'react-router';

require('./_actions.sass');

function Actions(props) {
  const {actions, modifier} = props;
  var actionsMap, btnClass;
  btnClass = 'btn';
  modifier && (btnClass += ' -' + modifier);

  if (actions) {
    actionsMap = actions.map((action, index) => {
      if(action.onClick) {
        return <button key={index} className={btnClass} data-actionparam={action.param} onClick={action.onClick}>{action.linkTitle}</button>
      } else {
        return <Link key={index} to={action.linkTo} className={btnClass}>{action.linkTitle}</Link>
      }
    });

    return (
      <footer className="actions-block">
        {actionsMap}
      </footer>
    )
  } else {
    return false;
  }
}

export default Actions;
