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
      <div className="map">
        <RespImageCover image={map} />
      </div>
    </div>
  )
}

export default Gmap;
