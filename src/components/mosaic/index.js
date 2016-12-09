import React from 'react';
import css from '../../lib/css';

import Tile from '../tile';

require('./_mosaic.sass');

function Mosaic(props) {

  const {tiles} = props;
  if (!tiles)
    return null;

  const compName = 'mosaic';

  const tileMap = tiles.map((tile) => {
    return (<Tile key={tile.id} {...tile}/>);
  });
  return (
    <section className={css.section + compName}>
      <ul className={css.list + compName}>
        {tileMap}
      </ul>
    </section>
  );
}

export default Mosaic;
