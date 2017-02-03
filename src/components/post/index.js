import React from 'react'
import {globals, trimContent} from '../../lib/utils'
import ArticleHeader from '../article-header'
import Author from '../author'
import Comments from '../comments'
import css from '../../lib/css'
import PostInfo from '../post-info'
import Wysiwyg from '../wysiwyg'
import './_post.sass'

const Post = ({post, excerpt, main}) => {
  const compName = 'post'
  var content,
    image,
    more,
    displayComments,
    previewParas

  const postInfo = {
    views: '',
    comments: post.t_comments_info.total,
    shares: '',
    date: post.date_gmt,
    categories: post.t_categories,
    author: post.t_author.name
  }

  if (excerpt) {
    main
      ? previewParas = 3
      : previewParas = 1
    content = trimContent(post.content.rendered, previewParas)
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
      <PostInfo {...postInfo}/>
      <Wysiwyg content={content} more={more}/> {!excerpt && <Author author={post.t_author}/>}
      {displayComments && <Comments commentsInfo={post.t_comments_info} postTitle={post.title.rendered} postID={post.id}/>}
    </article>
  )
}

export default Post
