import React from 'react';
import css from '../../lib/css';

import Vcard from '../vcard';
import RespImageCover from '../resp-image-cover';

require('./_map.sass');

function Gmap(props) {
  const {compName, options} = props;

  return (
    <div className={css.content + compName}>
      <Vcard {...options}/>
      <RespImageCover image={props.image} srcVersion='large' respSizes="100vw"/>
    </div>
  )
}

export default Gmap;
