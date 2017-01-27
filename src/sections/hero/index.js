import React from 'react'
import css from '../../lib/css'
import SVG from '../../components/svg'
import Wysiwyg from '../../components/wysiwyg'
import './_hero.sass'

const Hero = ({compName, headlinePre, headline, headlinePost, headlineImage, content, fullscreen, paragraphWidth, contentImage}) => {
  var modifier, hasHeadline

  fullscreen
   ? modifier = ' -fullscreen'
   : modifier = ''

  headlinePre || headline || headlinePost || headlineImage
    ? hasHeadline = true
    : hasHeadline = false

  return (
    <div className={css.main + compName + modifier}>
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
