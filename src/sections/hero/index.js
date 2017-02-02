import React from 'react'
import css from '../../lib/css'
import SVG from '../../components/svg'
import Wysiwyg from '../../components/wysiwyg'
import './_hero.sass'

const Hero = ({compName, headlinePre, headline, headlinePost, headlineImage, content, paragraphWidth, contentImage}) => {
  var hasHeadline

  headlinePre || headline || headlinePost || headlineImage
    ? hasHeadline = true
    : hasHeadline = false

  return (
    <div className={css.main + compName}>
      {hasHeadline && <h1 className={css.title}>
        {headlinePre}
        {headline && <strong>{headline}</strong>}
        {headlinePost}
        <SVG type={headlineImage}/>
      </h1>}
      <Wysiwyg content={content} size={paragraphWidth}/>
      <SVG type={contentImage}/>
    </div>
  )
}

export default Hero
