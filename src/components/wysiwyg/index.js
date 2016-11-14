import React from 'react';

require('./_wysiwyg.sass');

function Wysiwyg(props) {
  const {content, modifier, size} = props;
  var wysClass = "wysiwyg-block";

  modifier && (wysClass += ' -' + modifier);
  size && (wysClass += ' -' + size);

  return (
    <div className={wysClass} dangerouslySetInnerHTML={{__html: content}}></div>
  );
}

export default Wysiwyg;
