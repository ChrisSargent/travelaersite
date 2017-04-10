import React from 'react'
import css from '../../lib/css'
import './_legal.sass'

const Legal = ({legalName, credit}) => {
  const compName = 'legal'
  const year = new Date().getFullYear()

  return (
    <div className={css.main + compName}>
      {credit && <span className="credit">{credit}</span>}
      <span className="copy">&copy;&nbsp;{year}&nbsp;{legalName}. All rights reserved.</span>
    </div>
  )
}

export default Legal
