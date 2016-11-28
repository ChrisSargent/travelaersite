import React from 'react';
import css from '../../lib/css';

import ArticleHeader from '../article-header';
import Avatar from '../avatar';
import Wysiwyg from '../wysiwyg';

require('./_author.sass');

function Author(props) {
  const {author} = props;
  const compName = 'author';

  return (
    <aside className={css.article + compName}>
      <Avatar avatar={author.avatar} modifier={compName} alt={author.name}/>
      <div className={css.content + compName}>
        <ArticleHeader title={'Written by ' + author.name} modifier={compName} />
        <Wysiwyg content={author.description} />
      </div>
    </aside>
  );
}

export default Author;
