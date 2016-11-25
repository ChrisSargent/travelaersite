import React from 'react';
import css from '../../lib/css';

require('./_article-header.sass');

function ArticleHeader(props) {
  const {modifier, subtitle} = props;
  var {title} = props, headClass;

  modifier ? headClass = css.header + modifier : headClass = css.header + css.default;

  typeof title === 'object' && (title = title.rendered);

  return (
    <header className={headClass}>
      {title && <h1 className={css.title}>{title}</h1>}
      {subtitle && <span className={css.subtitle}>{subtitle}</span>}
    </header>
  );
}

export default ArticleHeader;
