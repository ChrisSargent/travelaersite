import React from 'react'
import css from '../../lib/css'
import ContentTile from '../../components/tile/content'
import TeamTile from '../../components/tile/team'

import './_mosaic.sass'

const Mosaic = ({tiles, compName, type}) => {
  var tileMap, filters = null
  if (!tiles)
    return null

  switch (type) {
    // See: http://blog.andresgalante.com/RGBAtoFeColorMatrix/
    // Blue: $co--blue--lt: #0092c0
    // Violet: $co--blue-vio: #333967
    // Grey: $co--blue-grey--md: #5b6b84
    // Yellow Green: $co--yelgreen: #6da54c
    // Teal: $co--teal: #00a387
    // Note that the spacing of the matrix and line breaks is important

    case 'team':
      tileMap = tiles.map((tile) => {
        return <TeamTile key={tile.id} {...tile.acf} title={tile.title}/>
      })
      filters = <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" id="svg-filters" aria-hidden="true">
                  <defs>
                    <filter id="filter-bw">
                      <feColorMatrix type="matrix" colorInterpolationFilters="sRGB"
                        values="0    1    0    0.3  0
                                0    1    0    0.3  0
                                0    1    0    0.3  0
                                0    1    0    1    0    "/>
                    </filter>
                    <filter id="filter-blue">
                      <feColorMatrix colorInterpolationFilters="sRGB" type="matrix"
                        values="0    0    0    0    0
                                0    0.57 0    0    0
                                0    0    0.75 0    0
                                0    0    0    1    0 "/>
                    </filter>
                    <filter id="filter-violet">
                      <feColorMatrix colorInterpolationFilters="sRGB" type="matrix"
                        values="0.2  0    0    0    0
                                0    0.22 0    0    0
                                0    0    0.4  0    0
                                0    0    0    1    0 "/>
                    </filter>
                    <filter id="filter-grey">
                      <feColorMatrix colorInterpolationFilters="sRGB" type="matrix"
                        values="0.36 0    0    0    0
                                0    0.42 0    0    0
                                0    0    0.52 0    0
                                0    0    0    1    0 "/>
                    </filter>
                    <filter id="filter-yellowgreen">
                      <feColorMatrix colorInterpolationFilters="sRGB" type="matrix"
                        values="0.43 0    0    0    0
                                0    0.65 0    0    0
                                0    0    0.3  0    0
                                0    0    0    1    0 "/>
                    </filter>
                    <filter id="filter-teal">
                      <feColorMatrix colorInterpolationFilters="sRGB" type="matrix"
                        values="0    0    0    0    0
                                0    0.64 0    0    0
                                0    0    0.53 0    0
                                0    0    0    1    0 "/>
                    </filter>
                  </defs>
                </svg>
      break

    case 'content':
      tileMap = tiles.map((tile) => {
        return <ContentTile key={tile.id} {...tile.acf}/>
      })
      break

    default:
  }

  return (
    <div>
      <ul className={css.list + compName + ' -' + type}>
        {tileMap}
      </ul>
      {filters}
    </div>
  )
}

export default Mosaic
