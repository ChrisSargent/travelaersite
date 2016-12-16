import React from 'react';
import css from '../../lib/css';

import RespImageCover from '../resp-image-cover';

require('./_map.sass');

function Gmap(props) {
  const {compName} = props;

  return (
    <div className={css.content + compName}>
      <RespImageCover image={props.image} srcVersion='large' respSizes="100vw"/>
    </div>
  )
}

export default Gmap;
