import React from 'react'
import css from '../../lib/css'
import Actions from '../../components/actions'
import Wysiwyg from '../../components/wysiwyg'
import './_positions.sass'

const Positions = ({title, content, positions, actions, compName}) => {
  actions[0].modifier = 'cta'

  const positionMap = positions.map((position, index) => {
    return (
      <li key={index} className={css.item}>
        <a href={position.external_url} className="position">
          {position.position}
        </a>
      </li>
    )
  })

  return (
    <div className={css.main + compName}>
      <h1 className={css.title}>{title}</h1>
      <ul className={css.list + compName}>
        {positionMap}
      </ul>
      <Wysiwyg content={content} />
      <Actions actions={actions} />
    </div>
  )
}

export default Positions
