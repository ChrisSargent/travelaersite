import React from 'react'
import css from '../../lib/css'
import RespImage from '../../components/resp-image'
import './_banner.sass'

const Banner = ({logos, title, compName, identifier}) => {
  var logoMap = null

  logos && (logoMap = logos.map((logo, index) => {
    return (
      <li key={index} className={css.item}>
        <RespImage image={logo} srcVersion="medium" respSizes="25vw"/>
      </li>
    )
  }))

  return (
    <div className={css.main + compName + ' -' + identifier}>
      <h1 className={css.title}>{title}</h1>
      <ul className={css.list + compName}>
        {logoMap}
      </ul>
    </div>
  )
}

export default Banner
