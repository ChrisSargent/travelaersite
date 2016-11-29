import React from 'react';

require('./_wysiwyg.sass');

function Wysiwyg(props) {
  const {size} = props;
  const compName = 'wysiwyg';
  var {content} = props, wysClass;

  wysClass = compName;
  size && (wysClass += ' -' + size);

  typeof content === 'object' && (content = content.rendered);

  return (
    <div className={wysClass} dangerouslySetInnerHTML={{__html: content}}></div>
  );
}

export default Wysiwyg;
