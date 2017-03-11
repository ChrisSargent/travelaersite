import React from 'react'
import css from '../../lib/css'
import RespImage from '../../components/resp-image'
import Wysiwyg from '../../components/wysiwyg'
import './_travel-paas.sass'

const ContentScreenshots = ({compName, title, content, screenshots, full_width_screenshots}) => {
  var images = false, graphicBlock = false

  if (screenshots) {
    var graphicsClass = 'tpaas-graphics'
    full_width_screenshots && (graphicsClass += ' -fullwidth')

    images = screenshots.map((screenshot, index) => {
      var respSizes = '(min-width: 840px) 50vw, 100vw'
      full_width_screenshots && (respSizes = '100vw')
      return (<RespImage key={index} image={screenshot} respSizes={respSizes}/>)
    })
    graphicBlock = <div className={graphicsClass}>{images}</div>
  }

  return (
    <div className={css.main + compName}>
      <h2 className={css.title}>{title}</h2>
      <div className={css.container}>
        <div className='tpaas-content'>
          <Wysiwyg content={content}/>
        </div>
        {graphicBlock}
      </div>
    </div>
  )
}

export default ContentScreenshots
