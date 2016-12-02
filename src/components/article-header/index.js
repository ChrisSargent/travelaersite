import React from 'react';
import css from '../../lib/css';

import SVG from '../svg';

require('./_article-header.sass');

function ArticleHeader(props) {
  const {modifier, subtitle, icon} = props;
  var {title} = props,
    headClass;

  modifier
    ? headClass = css.header + modifier
    : headClass = css.header + css.default;

  typeof title === 'object' && (title = title.rendered);

  return (
    <header className={headClass}>
      {icon && <SVG type={icon}/>}
      <div className={css.wrap}>
        {title && <h1 className={css.title}>{title}</h1>}
        {subtitle && <span className={css.subtitle}>{subtitle}</span>}
      </div>
    </header>
  );
}

export default ArticleHeader;
