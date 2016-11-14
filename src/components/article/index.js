import React from 'react';
import Actions from '../actions';
import ArticleHeader from '../article-header';
import Screenshots from '../screenshots';
import Wysiwyg from '../wysiwyg';

require('./_article.sass');

function Article(props) {
  const {title, content, actions, boxed, screenshots, modifier, divOnly} = props;
  var articleClass;

  articleClass = 'article-block';
  boxed && (articleClass += ' -boxed');

  if (divOnly) {
    return (
      <div className={articleClass}>
        <ArticleHeader title={title} modifier={modifier} />
        <Wysiwyg content={content} modifier={modifier} />
        <Actions actions={actions} />
        <Screenshots screenshots={screenshots} />
      </div>
    )
  } else {
    return (
      <article className={articleClass}>
        <ArticleHeader title={title} modifier={modifier} />
        <Wysiwyg content={content} modifier={modifier} />
        <Actions actions={actions} />
        <Screenshots screenshots={screenshots} />
      </article>
    )
  }
}

export default Article;
