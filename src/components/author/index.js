import React from 'react';

import ArticleHeader from '../article-header';
import Avatar from '../avatar';
import Wysiwyg from '../wysiwyg';

require('./_author.sass');

function Author(props) {
  const {author} = props;

  var title = 'Written by ' + author.name;

  return (
    <aside className="article-author">
      <Avatar avatar={author.avatar} modifier="author" alt={author.name}/>
      <div className="content-author">
        <ArticleHeader title={title} modifier="author" />
        <Wysiwyg content={author.description} modifier="author" />
      </div>
    </aside>
  );
}

export default Author;
