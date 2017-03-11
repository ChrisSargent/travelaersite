import React from 'react'
import css from '../../lib/css'
import SVG from '../../components/svg'
import Wysiwyg from '../../components/wysiwyg'
import './_travel-paas.sass'

const Features = ({compName, feature}) => {
  const featureMap = feature.map((item, index) => {

    return (
      <li key={index} className={css.item}>
        <SVG type={item.icon} />
        <h2 className={css.title}>{item.title}</h2>
        <Wysiwyg content={item.content}/>
      </li>
    )
  })

  return (
    <div className={css.main + compName}>
      <div className="tpaas-content">
        <ul className={css.list + compName}>
          {featureMap}
        </ul>
      </div>
    </div>
  )
}

export default Features
