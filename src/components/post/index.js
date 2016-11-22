import React from 'react';

import ArticleHeader from '../article-header';
import Author from '../author';
import CommentBlock from '../comments';
import Info from '../info';
import Wysiwyg from '../wysiwyg';

require('./_post.sass');

function Post(props) {
  const {post} = props;

  var postInfo = {
    views: '',
    comments: '',
    shares: '',
    date: post.date_gmt,
    tags: post.t_tags,
    author: post.t_author.name
  };

  return (
    <article className="article-post">
      <ArticleHeader title={post.title} modifier="post"/>
      <Info info={postInfo}/>
      <Wysiwyg content={post.content} modifier="post"/>
      <Author author={post.t_author}/>
      <CommentBlock commentsInfo={post.t_comments_info} title={post.title.rendered} post={post.id} />
    </article>
  )
}

export default Post;
