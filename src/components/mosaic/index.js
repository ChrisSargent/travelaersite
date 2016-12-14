import React from 'react';
import css from '../../lib/css';

import Tile from '../tile';
import Section from '../section';

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
    <Section compName={compName}>
      <ul className={css.list + compName}>
        {tileMap}
      </ul>
    </Section>
  );
}

export default Mosaic;
