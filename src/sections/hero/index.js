import React from 'react'
import Actions from '../../components/actions'
import css from '../../lib/css'
import Wysiwyg from '../../components/wysiwyg'
import './_hero.sass'

const Hero = ({compName, content, paragraphWidth, headline_wysiwyg, actions}) => {

  return (
    <div className={css.main + compName}>
      {headline_wysiwyg && <h1 className={css.title} dangerouslySetInnerHTML={{__html: headline_wysiwyg}}/>}
      <Wysiwyg content={content} size={paragraphWidth}/>
      <Actions actions={actions} />
    </div>
  )
}

export default Hero
