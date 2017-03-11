import React from 'react'
import css from '../../lib/css'
import './_cite.sass'

const Cite = ({name, jobTitle, company}) => {
  if (!name && !jobTitle && !company)
    return null

  const compName = 'cite'

  return (
    <footer className={css.footer + compName}>
      <cite>
        {name && <span className="fn">{name}</span>}
        {jobTitle && <span className="pos">{jobTitle}</span>}
        {company && <span className="co">{company}</span>}
      </cite>
    </footer>
  )
}

export default Cite
