import React from 'react'
import css from '../../lib/css'
import RespImage from '../../components/resp-image'
import Wysiwyg from '../../components/wysiwyg'
import './_travel-paas.sass'

const ContentScreenshots = ({compName, title, content, screenshots}) => {
  const images = screenshots.map((screenshot, index) => {
    return (
      <RespImage key={index} image={screenshot} respSizes="50vw"/>
    )
  })

  return (
    <div className={css.main + compName}>
      <h2 className={css.title}>{title}</h2>
      <Wysiwyg content={content}/>
      <div className="screenshot-block">
        {images}
      </div>
    </div>
  )
}

export default ContentScreenshots
