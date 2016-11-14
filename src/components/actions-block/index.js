import React from 'react';
import {Link} from 'react-router';

require('./_actions-block.sass');

function Actions(props) {
  const {actions} = props;
  var actionsMap;

  if (actions) {
    actionsMap = actions.map((action, index) => {
      return <Link key="index" to={action.linkTo} className="btn">{action.linkTitle}</Link>
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
