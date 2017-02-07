import React from 'react'
import {dateFormat} from '../../lib/utils'
import css from '../../lib/css'
import SVG from '../svg'
import './_post-info.sass'

const PostInfo = ({views, comments, shares, date, categories, author, options}) => {
  const compName = 'info'
  const dateString = dateFormat(date)

  return (
    <aside className={css.main + compName}>
      <span className="author"><SVG type="time"/>{dateString} by {author}</span>
      {views && <span className="info"><SVG type="views"/>{views}</span>}
      <span className="info"><SVG type="comments"/>{comments || '0'}&nbsp;comment{comments !== 1 && 's'}</span>
      {shares && <span className="info"><SVG type="shares"/>{shares}</span>}
      {categories && <span className="info"><SVG type="categories"/>{categories.join(', ')}</span>}
    </aside>
  )
}

export default PostInfo
