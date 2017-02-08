import React from 'react'
import css from '../../lib/css'
import RespImage from '../../components/resp-image'
import SVG from '../../components/svg'
import Wysiwyg from '../../components/wysiwyg'
import './_travel-paas.sass'

const ContentScreenshots = ({compName, title, content, screenshots, architecture_diagram}) => {
  var images = false

  if (screenshots) {
    images = screenshots.map((screenshot, index) => {
      return (<RespImage key={index} image={screenshot} respSizes="(min-width: 840px) 50vw, 100vw"/>)
    })
  }

  return (
    <div className={css.main + compName}>
      <h2 className={css.title}>{title}</h2>
      <div className={css.container}>
        <Wysiwyg content={content}/>
        <div className="screenshot-block">
          {images}
          <SVG type={architecture_diagram} />
        </div>
      </div>
    </div>
  )
}

export default ContentScreenshots
