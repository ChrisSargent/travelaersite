import React from 'react'
import Link from 'react-router/lib/Link'
import {toRelative} from '../../lib/utils'
import css from '../../lib/css'
import SVG from '../svg'
import './_actions.sass'

const Actions = ({actions, onClick}) => {
  if (!actions)
    return null

  const compName = 'actions'
  const icon = <span className={compName + '-icon'}><SVG type='spinner' /></span>
  const actionsMap = actions.map((action, index) => {
    var btnClass = css.btn, modifier = ' -cta'
    const url = toRelative(action.linkTo)

    action.modifier
      ? btnClass += ' -' + action.modifier
      : btnClass += modifier
    action.loading && (btnClass += css.loading)


    if (action.param) {
      return <li key={index} className={css.item}><button className={btnClass} type="button" disabled={action.loading} data-actionparam={action.param}>{action.linkTitle}{icon}</button></li>
    } else if (action.submit) {
      return <li key={index} className={css.item}><button className={btnClass} type="submit" disabled={action.loading}>{action.linkTitle}{icon}</button></li>
    } else {
      return <li key={index} className={css.item}><Link to={url} className={btnClass}>{action.linkTitle}</Link></li>
    }
  })

  return (
    <footer className={css.footer + compName} onClick={onClick}>
      <ul className={css.list + compName}>
        {actionsMap}
      </ul>
    </footer>
  )
}

export default Actions
