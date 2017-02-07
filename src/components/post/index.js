import React from 'react'
import {Link} from 'react-router'
import {trimContent} from '../../lib/utils'
import ArticleHeader from '../article-header'
import Author from '../author'
import Comments from '../comments'
import css from '../../lib/css'
import PostInfo from '../post-info'
import PostSchema from '../post-schema'
import Wysiwyg from '../wysiwyg'
import './_post.sass'

const Post = ({post, excerpt, main}) => {
  var content,
    image,
    previewParas = 1

  if (!post)
    return null

  const compName = 'post'
  const postInfo = {
    views: '',
    comments: post.t_comments_info.total,
    shares: '',
    date: post.date_gmt,
    categories: post.t_categories,
    author: post.t_author.name
  }

  if (excerpt) {
    main && (previewParas = 3)
    content = trimContent(post.content.rendered, previewParas)
  } else {
    content = post.content
  }

  main
    ? image = false
    : image = post.t_featured_image

  return (
    <article className={css.article + compName} >
      <ArticleHeader title={post.title} modifier={compName} image={image}/>
      <PostInfo {...postInfo}/>
      <Wysiwyg content={content} itemProp="articleBody"/>
      {excerpt && <Link to={post.link} className={css.more}><span itemProp="mainEntityOfPage" content={post.url}>&raquo;&nbsp;Read More</span></Link>}
      {!excerpt && <Author author={post.t_author}/>}
      {!excerpt && <Comments commentsInfo={post.t_comments_info} postTitle={post.title.rendered} postID={post.id}/>}
      <PostSchema post={post} />
    </article>
  )
}

export default Post
