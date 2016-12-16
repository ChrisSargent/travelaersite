import React from 'react';
import css from '../../lib/css'
import {Link} from 'react-router';

require('./_wysiwyg.sass');

function Wysiwyg(props) {
  const {size, more} = props;
  const compName = 'wysiwyg';
  var {content} = props, wysClass;

  if(!content)
    return false;

  wysClass = compName;
  size && (wysClass += ' -' + size);

  typeof content === 'object' && (content = content.rendered);

  return (
    <div className={wysClass}>
      <div dangerouslySetInnerHTML={{__html: content}}></div>
      {more && <Link to={more} className={css.more}>Read More</Link>}
    </div>
  );
}

export default Wysiwyg;
