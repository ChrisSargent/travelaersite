import React from 'react';
import css from '../../lib/css';

require('./_message.sass');

function Message(props) {
  const {message, messageType, error} = props.messageObj;
  const compName = 'message';
  var compClass = css.block + compName

  switch (messageType) {
    case 'error':
      compClass += ' ' + css.error;
      break;
    case 'warning':
      compClass += ' ' + css.warning;
      break;
    case 'success':
      compClass += ' ' + css.success;
      break;
    default:

  }

  return (
    <div className={compClass}>
      {message}
      {error && <span dangerouslySetInnerHTML={{__html: error}}></span>}
    </div>
  );
}

export default Message;
