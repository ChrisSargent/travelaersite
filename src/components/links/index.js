import React from 'react'
import css from '../../lib/css'
import RespImage from '../resp-image'
import './_links.sass'

const Links = ({externalLinks}) => {
  if (!externalLinks)
    return null

  const compName = 'links'
  const linkMap = externalLinks.map((link, index) => {
    return (
      <li key={index} className={css.item}>
        <a className="link" href={link.external_link} target="_blank">
          <RespImage image={link.external_logo} srcVersion='medium' respSizes="130px"/>
        </a>
      </li>
    )
  })

  return (
    <div className={css.main + compName}>
      <h2 className={css.title}>Awards</h2>
      <ul className={css.list + compName}>
        {linkMap}
      </ul>
    </div>
  )
}

export default Links
