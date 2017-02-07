import React from 'react'
import {Link} from 'react-router'
import {dateFormat} from '../../lib/utils'
import ArticleHeader from '../article-header'
import css from '../../lib/css'
import PostSchema from '../post-schema'
import RespImageCover from '../resp-image-cover'
import './_recent-posts.sass'

const RecentPosts = ({posts}) => {
  if (!posts)
    return null

  const compName = 'recentposts'
  const postsMap = posts.map((post, index) => {
    var modifier,
      icon

    const compName = 'recentpost'
    const dateString = dateFormat(post.date_gmt, false)

    if (index < 2) {
      modifier = compName + ' -large'
      icon = 'post'
    } else {
      modifier = compName
      icon = false
    }
    return (
      <li key={post.id} className={css.item}>
        <Link to={post.link}>
          <article className={css.article + modifier}>
            <RespImageCover image={post.t_featured_image} srcVersion="medium" respSizes="350px" alt={post.title}/>
            <ArticleHeader title={post.title} subtitle={dateString} icon={icon} modifier={modifier}/>
            <PostSchema post={post} />
          </article>
        </Link>
      </li>
    )
  })

  return (
    <ul className={css.list + compName}>
      {postsMap}
    </ul >
  )
}

export default RecentPosts
