import React from 'react'
import css from '../../lib/css'
import Tile from '../../components/tile'

import './_mosaic.sass'

const Mosaic = ({tiles, compName}) => {
  if (!tiles)
    return null

  const tileMap = tiles.map((tile) => {
    return (<Tile key={tile.id} {...tile.acf}/>)
  })
  return (
    <ul className={css.list + compName}>
      {tileMap}
    </ul>
  )
}

export default Mosaic
