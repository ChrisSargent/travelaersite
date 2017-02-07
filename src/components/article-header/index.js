import React from 'react'
import css from '../../lib/css'
import RespImageCover from '../resp-image-cover'
import SVG from '../svg'
import './_article-header.sass'

const ArticleHeader = ({modifier, subtitle, icon, image, title, itemProp}) => {
  var headClass

  modifier
    ? headClass = css.header + modifier
    : headClass = css.header + css.default

  image && (headClass += ' -bg')
  title.rendered && (title = title.rendered)

  return (
    <header className={headClass}>
      {icon && <SVG type={icon}/>}
      <div className={css.container}>
        {title && <h1 className={css.title} itemProp={itemProp} dangerouslySetInnerHTML={{__html: title}}></h1>}
        {subtitle && <span className={css.subtitle}>{subtitle}</span>}
      </div>
      <RespImageCover image={image} />
    </header>
  )
}

export default ArticleHeader
