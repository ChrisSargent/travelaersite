import React from 'react';
import css from '../../lib/css';

import Tile from '../tile';

require('./_mosaic.sass');

function Mosaic(props) {
  console.log(props);

  const {tiles, compName} = props;
  if (!tiles)
    return null;

  const tileMap = tiles.map((tile) => {
    return (<Tile key={tile.id} {...tile}/>);
  });
  return (
    <ul className={css.list + compName}>
      {tileMap}
    </ul>
  );
}

export default Mosaic;
