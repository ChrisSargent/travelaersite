import React from 'react';
import css from '../../lib/css';
import globals from '../../lib/globals';

import ArticleHeader from '../article-header';
import Author from '../author';
import CommentBlock from '../comments';
import PostInfo from '../post-info';
import Wysiwyg from '../wysiwyg';

require('./_post.sass');

function Post(props) {
  const {post, excerpt, main} = props;
  const compName = 'post';
  var content,
    image,
    more;
  var postInfo = {
    views: '',
    comments: post.t_comments_info.total,
    shares: '',
    date: post.date_gmt,
    categories: post.t_categories,
    author: post.t_author.name
  };

  if (excerpt) {
    content = trimContent(post.content.rendered, main)
    more = globals.blogUrl + '/' + post.slug;
  } else {
    content = post.content;
    more = false;
  }
  main
    ? image = false
    : image = post.t_featured_image;

  return (
    <article className={css.article + compName}>
      <ArticleHeader title={post.title} modifier={compName} image={image}/>
      <PostInfo info={postInfo}/>
      <Wysiwyg content={content} more={more}/> {!excerpt && <Author author={post.t_author}/>}
      {!excerpt && <CommentBlock commentsInfo={post.t_comments_info} title={post.title.rendered} post={post.id}/>}
    </article>
  )
}

function trimContent(content, main) {
  var paras;
  // Set how many paragraphs we should cut to
  main
    ? paras = 3
    : paras = 1

  var excerpt = content.split('</p>', paras)
  return excerpt.join('');
}

export default Post;
