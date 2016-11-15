import React from 'react';

require('./_article-header.sass');

function ArticleHeader(props) {
  const {modifier} = props;
  var {title} = props, artHeadClass;

  modifier ? artHeadClass = 'header-' + modifier : artHeadClass = 'header-article';

  typeof title === 'object' && (title = title.rendered);

  return (
    <header className={artHeadClass}>
      <h1 className="title">{title}</h1>
    </header>
  );
}

export default ArticleHeader;
