import React from 'react'
import ArticleHeader from '../article-header'
import css from '../../lib/css'
import RespImageCover from '../resp-image-cover'
import Wysiwyg from '../wysiwyg'
import './_author.sass'

const Author = ({author}) => {
  const compName = 'author'

  return (
    <aside className={css.main + compName}>
      <RespImageCover avatar image={author.avatar} respSizes="100px" srcVersion="medium" alt={author.name} />
      <div className={css.article + compName}>
        <ArticleHeader title={'Written by ' + author.name} modifier={compName} />
        <Wysiwyg content={author.description} />
      </div>
    </aside>
  )
}

export default Author
