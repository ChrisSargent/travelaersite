import React from 'react'
import css from '../../lib/css'
import RespImageCover from '../resp-image-cover'
import SVG from '../svg'

const ArticleHeader = ({compName, subtitle, icon, image, title}) => {
  var headClass = css.header + compName
  image && (headClass += ' -bg')

  return (
    <header className={headClass}>
      {icon && <SVG type={icon}/>}
      <div className={css.container}>
        {title && <h1 className={css.title}>{title}</h1>}
        {subtitle && <span className={css.subtitle}>{subtitle}</span>}
      </div>
      <RespImageCover image={image} />
    </header>
  )
}

export default ArticleHeader
