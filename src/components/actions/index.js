import React from 'react'
import {Link} from 'react-router'
import {stripDomain} from '../../lib/utils'
import css from '../../lib/css'
import './_actions.sass'

const Actions = ({actions, onClick}) => {
  if (!actions)
    return

  const compName = 'actions'
  const actionsMap = actions.map((action, index) => {
    var btnClass
    const url = stripDomain(action.linkTo)

    btnClass = css.btn
    action.modifier && (btnClass += ' -' + action.modifier)

    if (action.param) {
      return <button key={index} className={btnClass} type="button" data-actionparam={action.param}>{action.linkTitle}</button>
    } else if (action.submit) {
      return <button key={index} className={btnClass} type="submit">{action.linkTitle}</button>
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
