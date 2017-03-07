import React from 'react'
import css from '../../lib/css'
import Wysiwyg from '../../components/wysiwyg'
import './_hero.sass'

const Hero = ({compName, headlinePre, headline, headlinePost, headlineImage, content, paragraphWidth, headline_wysiwyg}) => {

  return (
    <div className={css.main + compName}>
      {headline_wysiwyg && <h1 className={css.title} dangerouslySetInnerHTML={{__html: headline_wysiwyg}}/>}
      <Wysiwyg content={content} size={paragraphWidth}/>
    </div>
  )
}

export default Hero
