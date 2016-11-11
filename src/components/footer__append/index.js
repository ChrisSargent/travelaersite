import React from 'react';

require('./_footer__append.sass');

function FooterAppend(props) {

  return (
    <div className="ftr__apd">{props.text}</div>
  );
}

export default FooterAppend;
