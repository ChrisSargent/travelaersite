import React from 'react'
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
  var content = post.content,
    headerImage = false,
    previewParas = 1,
    readMore = false

  if (!post)
    return null

  const compName = 'post'

  if (excerpt) {
    main && (previewParas = 3)
    content = trimContent(post.content.rendered, previewParas)
    readMore = post.link
  }

  !main && (headerImage = post.t_featured_image)

  return (
    <article className={css.article + compName} >
      <ArticleHeader title={post.title} compName={compName} image={headerImage}/>
      <PostInfo {...post}/>
      <Wysiwyg content={content} more={readMore} />
      {!excerpt && <Author author={post.t_author}/>}
      {!excerpt && <Comments commentsInfo={post.t_comments_info} postTitle={post.title.rendered} postID={post.id}/>}
      <PostSchema post={post} />
    </article>
  )
}

export default Post
