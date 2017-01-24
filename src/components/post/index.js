import React from 'react'
import css from '../../lib/css'
import {globals} from '../../lib/utils'

import ArticleHeader from '../article-header'
import Author from '../author'
import Comments from '../comments'
import PostInfo from '../post-info'
import Wysiwyg from '../wysiwyg'

import './_post.sass'

function trimContent(content, main) {
  var paras
  // Set how many paragraphs we should cut to
  main
    ? paras = 3
    : paras = 1

  var excerpt = content.split('</p>', paras)
  return excerpt.join('')
}

function Post(props) {
  const {post, excerpt, main} = props;
  const compName = 'post';
  var content,
    image,
    more,
    displayComments

  var postInfo = {
    views: '',
    comments: post.t_comments_info.total,
    shares: '',
    date: post.date_gmt,
    categories: post.t_categories,
    author: post.t_author.name
  }

  if (excerpt) {
    content = trimContent(post.content.rendered, main)
    more = globals.blogUrl + '/' + post.slug
    displayComments = false
  } else {
    content = post.content
    more = false
    displayComments = true
  }
  main
    ? image = false
    : image = post.t_featured_image

  return (
    <article className={css.article + compName}>
      <ArticleHeader title={post.title} modifier={compName} image={image}/>
      <PostInfo info={postInfo}/>
      <Wysiwyg content={content} more={more}/> {!excerpt && <Author author={post.t_author}/>}
      {displayComments && <Comments commentsInfo={post.t_comments_info} postTitle={post.title.rendered} postID={post.id}/>}
    </article>
  )
}

export default Post
