import React from 'react';
import css from '../../lib/css';

import RespImageCover from '../resp-image-cover';
import Vcard from '../vcard';

require('./_map.sass');

function Gmap(props) {
  const {compName, options, map} = props;

  return (
    <div className={css.content + compName}>
      <Vcard {...options}/>
      <RespImageCover image={map} />
    </div>
  )
}

export default Gmap;
