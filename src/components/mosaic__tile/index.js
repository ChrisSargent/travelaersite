import React from 'react';

function MosaicTile(props) {
  const tile = props;
  const tileClassList = 'mosaic__tile tile--' + tile.acf.colour;
  const iconClassList = 'i--' + tile.acf.type;

  return (
    <li className={tileClassList}>
      <i className={iconClassList} aria-hidden="true"></i>
      <a href={tile.acf.link} target="_blank">{tile.title.rendered}</a>
    </li>
  );
}

export default MosaicTile;
