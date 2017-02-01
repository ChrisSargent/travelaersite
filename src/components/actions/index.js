import React from 'react'
import {Link} from 'react-router'
import {stripDomain} from '../../lib/utils'
import css from '../../lib/css'
import SVG from '../svg'
import './_actions.sass'

const Actions = ({actions, onClick}) => {
  if (!actions)
    return

  const compName = 'actions'
  const icon = <span className={compName + '-icon'}><SVG type='spinner' /></span>
  const actionsMap = actions.map((action, index) => {
    var btnClass
    const url = stripDomain(action.linkTo)
    
    btnClass = css.btn
    action.modifier && (btnClass += ' -' + action.modifier)
    action.loading && (btnClass += css.loading)


    if (action.param) {
      return <button key={index} className={btnClass} type="button" disabled={action.loading} data-actionparam={action.param}>{action.linkTitle}{icon}</button>
    } else if (action.submit) {
      return <button key={index} className={btnClass} type="submit" disabled={action.loading}>{action.linkTitle}{icon}</button>
    } else {
      return <Link key={index} to={url} className={btnClass}>{action.linkTitle}</Link>
    }
  })

  return (
    <footer className={css.footer + compName} onClick={onClick}>
      {actionsMap}
    </footer>
  )

}

export default Actions
