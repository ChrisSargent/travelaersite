import React from 'react'
import css from '../../lib/css'
import {dateFormat} from '../../lib/utils'
import SVG from '../svg'

import './_post-info.sass'

function PostInfo(props) {
  var dateString,
    categoryMap
  const {
    views,
    comments,
    shares,
    date,
    categories,
    author
  } = props.info
  const compName = 'info'

  dateString = dateFormat(date)

  if (categories) {
    categoryMap = categories.map((category, i) => {
      if (i < categories.length - 1) {
        return category + ', '
      } else {
        return category
      }
    })
  }

  return (
    <aside className={css.main + compName}>
      <span className="author"><SVG type="time"/>{dateString}
        by {author}</span>
      {views && <span className="info">
        <SVG type="views"/> {views}
      </span>
}
      <span className="info">
        <SVG type="comments"/> {comments || '0'}
        comment{comments !== 1 && 's'}
      </span>
      {shares && <span className="info">
        <SVG type="shares"/> {shares}
      </span>
}
      {categories && <span className="info">
        <SVG type="categories"/> {categoryMap}
      </span>
}
    </aside>
  )
}

export default PostInfo
