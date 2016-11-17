import React from 'react';

require('./_article-header.sass');

function ArticleHeader(props) {
  const {modifier, subtitle} = props;
  var {title} = props, artHeadClass;

  modifier ? artHeadClass = 'header-' + modifier : artHeadClass = 'header-block';

  typeof title === 'object' && (title = title.rendered);

  return (
    <header className={artHeadClass}>
      {title && <h1 className="title">{title}</h1>}
      {subtitle && <span className="subtitle">{subtitle}</span>}
    </header>
  );
}

export default ArticleHeader;
