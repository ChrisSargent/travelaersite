import React from 'react'
import css from '../../lib/css'
import {Link} from 'react-router'
import './_wysiwyg.sass'

const Wysiwyg = ({size, more, content}) => {
  var wysClass

  if(!content)
    return false

  const compName = 'wysiwyg'
  wysClass = compName
  size && (wysClass += ' -' + size)

  content.rendered && (content = content.rendered)

  return (
    <div className={wysClass}>
      <div dangerouslySetInnerHTML={{__html: content}}></div>
      {more && <Link to={more} className={css.more}>&raquo;&nbsp;Read More</Link>}
    </div>
  )
}

export default Wysiwyg
