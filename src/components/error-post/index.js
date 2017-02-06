import React from 'react'
import css from '../../lib/css'
import ArticleHeader from '../../components/article-header'
import Wysiwyg from '../../components/wysiwyg'

const PostError = () => {
  const compName = 'post'
  const title = 'Sorry!'
  const content = "Uh oh, there was an error and we couldn't find the post you were looking for. Please try one of the links above or chat with us using the green button below"
  return (
    <article className={css.article + compName}>
      <ArticleHeader title={title} modifier={compName}/>
      <Wysiwyg content={content} />
    </article>
  )
}

export default PostError
