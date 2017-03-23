import React from 'react'
import css from '../../lib/css'
import Wysiwyg from '../wysiwyg'
import './_tile.sass'

const TileTeam = ({
  tile_display,
  gallery,
  tile_colour,
  tile_size,
  title
}) => {
  const compName = 'tile -team'
  const firstName = title.split(' ')[0]
  var tileClass = '', svgClass = 'svgbg'

  tile_colour && (svgClass += ' -' + tile_colour)
  tile_size && (tileClass += ' -' + tile_size)

  return (
    <li className={css.item + tileClass}>
      <article className={css.main + compName}>
        <h1 className={css.title}>{firstName}</h1>
        <Wysiwyg content={tile_display}/>
        <svg className={svgClass} xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" aria-labelledby="title">
          <title>{firstName}</title>
          <g className="colorize">
            <image className="_bgimgsvg" xlinkHref={gallery[0].sizes['large']} width="100%" height="100%" preserveAspectRatio="xMidYMid slice" />
          </g>
        </svg>
        {!tile_colour && <div className="fade"></div>}
      </article>
    </li>
  )
}

export default TileTeam
