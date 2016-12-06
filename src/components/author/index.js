import React from 'react';
import css from '../../lib/css';

import ArticleHeader from '../article-header';
import ImageCover from '../image-cover';
import Wysiwyg from '../wysiwyg';

require('./_author.sass');

function Author(props) {
  console.log(props);
  const {author} = props;
  const compName = 'author';

  return (
    <aside className={css.article + compName}>
      <ImageCover avatar="true" image={author.avatar} />
      <div className={css.content + compName}>
        <ArticleHeader title={'Written by ' + author.name} modifier={compName} />
        <Wysiwyg content={author.description} />
      </div>
    </aside>
  );
}

export default Author;
