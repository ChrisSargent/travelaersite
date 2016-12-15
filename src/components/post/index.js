import React from 'react';
import css from '../../lib/css';

import ArticleHeader from '../article-header';
import Author from '../author';
import CommentBlock from '../comments';
import PostInfo from '../post-info';
import Wysiwyg from '../wysiwyg';

require('./_post.sass');

function Post(props) {
  const {post} = props;
  const compName = 'post';

  var postInfo = {
    views: '',
    comments: post.t_comments_info.total,
    shares: '',
    date: post.date_gmt,
    categories: post.t_categories,
    author: post.t_author.name
  };

  // The Ref Callback is run once when this component is mounted - switching between it's props does not cause a remount

  return (
    <article className={css.article + compName}>
      <ArticleHeader title={post.title} modifier={compName}/>
      <PostInfo info={postInfo}/>
      <Wysiwyg content={post.content}/>
      <Author author={post.t_author}/>
      <CommentBlock commentsInfo={post.t_comments_info} title={post.title.rendered} post={post.id} />
    </article>
  )
}

export default Post;
