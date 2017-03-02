import React from 'react'
import css from '../../lib/css'
import SVG from '../../components/svg'
import Wysiwyg from '../../components/wysiwyg'
import './_hero.sass'

const Hero = ({compName, headlinePre, headline, headlinePost, headlineImage, content, paragraphWidth}) => {
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
    </div>
  )
}

export default Hero
