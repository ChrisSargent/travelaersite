import React from 'react';
import css from '../../lib/css';

import ArticleHeader from '../article-header';
import RespImageCover from '../resp-image-cover';
import Wysiwyg from '../wysiwyg';

require('./_author.sass');

function Author(props) {
  const {author} = props;
  const compName = 'author';

  return (
    <aside className={css.article + compName}>
      <RespImageCover avatar image={author.avatar} respSizes="100px" srcVersion="medium" alt={author.name} />
      <div className={css.content + compName}>
        <ArticleHeader title={'Written by ' + author.name} modifier={compName} />
        <Wysiwyg content={author.description} />
      </div>
    </aside>
  );
}

export default Author;
