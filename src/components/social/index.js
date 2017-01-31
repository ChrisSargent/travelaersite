import React from 'react'
import css from '../../lib/css'
import SVG from '../svg'
import './_social.sass'

const Social = ({socialNetworks, modifier}) => {
  var compClass, listClass

  if (!socialNetworks)
    return null

  const compName = 'social'

  compClass = css.main + compName
  listClass = css.list + compName

  if (modifier) {
    compClass += ' -' + modifier
    listClass += ' -' + modifier

  }

  const networkMap = socialNetworks.map((network, index) => {

    return (
      <li key={index} className={css.item}>
        <a href={network.link} target="_blank" className={css.link + compName}>
          <SVG type={network.iconType.value}/>
          <span className={css.label}>{network.iconType.label}</span>
        </a>
      </li>
    )
  })

  return (
    <div className={compClass}>
      <h2 className={css.title}>Connect with us on</h2>
      <ul className={listClass}>
        {networkMap}
      </ul>
    </div>
  )
}
export default Social
