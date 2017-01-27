import React from 'react'
import RespImage from '../../components/resp-image'
import css from '../../lib/css'
import Wysiwyg from '../../components/wysiwyg'

const Architecture = ({compName, items, title}) => {
  const itemMap = items.map((item, index) => {
    return (
      <li key={index} className={css.item}>
        <RespImage image={item.image} respSizes="50vw"/>
        <Wysiwyg content={item.content}/>
      </li>
    )
  })

  return (
    <div className={css.main + compName}>
      <h2 className={css.title}>{title}</h2>
      <ul className={css.list + compName}>
        {itemMap}
      </ul>
    </div>
  )
}

export default Architecture
