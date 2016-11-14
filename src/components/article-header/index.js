import React from 'react';

require('./_article-header.sass');

function ArticleHeader(props) {
  const {title, modifier} = props;
  var artHeadClass = 'article-header';

  modifier && (artHeadClass += ' -' + modifier);

  return (
    <header className={artHeadClass}>
      <h1 className="title">{title}</h1>
    </header>
  );
}

export default ArticleHeader;
