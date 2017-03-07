import React from 'react'
import css from '../../lib/css'
import Wysiwyg from '../wysiwyg'
import './_tile.sass'

const TileTeam = ({
  tile_display,
  gallery,
  tile_colour,
  tile_size,
  title,
  job_title
}) => {
  const compName = 'tile -team'
  var tileClass = '', svgClass = 'svgbg'

  tile_colour && (svgClass += ' -' + tile_colour.slug)
  tile_size && (tileClass += ' -' + tile_size.slug)

  return (
    <li className={css.item + tileClass}>
      <article className={css.main + compName}>
        <h1 className={css.title}>{title}</h1>
        <Wysiwyg content={tile_display}/>
        <svg className={svgClass} xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" aria-labelledby="title">
          <title>{title}</title>
          <g className="colorize">
            <image xlinkHref={gallery[0].sizes['large']} width="100%" height="100%" preserveAspectRatio="xMidYMid slice" />
          </g>
        </svg>
        {!tile_colour && <div className="fade"></div>}
      </article>
    </li>
  )
}

export default TileTeam
