import React from 'react'
import ArticleHeader from '../article-header'
import css from '../../lib/css'
import Link from 'react-router/lib/Link'
import PostSchema from '../post-schema'
import {toRelative, trimContent} from '../../lib/utils'
import Wysiwyg from '../wysiwyg'
import './_news-item.sass'

const NewsItem = ({post}) => {
  const {title, t_excerpt, image, link} = post
  const compName = 'newsitem';

  return (
    <article className={css.article + compName} >
      <ArticleHeader title={title} compName={compName} image={image}/>
      <Wysiwyg content={trimContent(t_excerpt)} />
      <Link to={toRelative(link)} className="link">Read More...</Link>
      <PostSchema post={post} />
    </article>
  )
}

export default NewsItem
