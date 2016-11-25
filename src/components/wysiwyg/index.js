import React from 'react';

require('./_wysiwyg.sass');

function Wysiwyg(props) {
  const {modifier, size} = props;
  var {content} = props, wysClass;

  modifier ? wysClass = 'wysiwyg-' + modifier : wysClass = 'wysiwyg-default';
  size && (wysClass += ' -' + size);

  typeof content === 'object' && (content = content.rendered);

  return (
    <div className={wysClass} dangerouslySetInnerHTML={{__html: content}}></div>
  );
}

export default Wysiwyg;
