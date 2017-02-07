import React from 'react'
import {dateFormat} from '../../lib/utils'
import css from '../../lib/css'
import SVG from '../svg'
import './_post-info.sass'

const PostInfo = ({views, shares, date_gmt, t_categories, t_comments_info, t_author}) => {
  const commentsTotal = t_comments_info.total
  const compName = 'info'
  const dateString = dateFormat(date_gmt)

  return (
    <aside className={css.main + compName}>
      <span className="author"><SVG type="time"/>{dateString} by {t_author.name}</span>
      {views && <span className="info"><SVG type="views"/>{views}</span>}
      <span className="info"><SVG type="comments"/>{commentsTotal || '0'}&nbsp;comment{commentsTotal !== 1 && 's'}</span>
      {shares && <span className="info"><SVG type="shares"/>{shares}</span>}
      {t_categories && <span className="info"><SVG type="categories"/>{t_categories.join(', ')}</span>}
    </aside>
  )
}

export default PostInfo
