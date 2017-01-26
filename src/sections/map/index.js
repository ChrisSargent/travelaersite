import React from 'react'
import css from '../../lib/css'
import RespImageCover from '../../components/resp-image-cover'
import Vcard from '../../components/vcard'
import './_map.sass'

const Gmap = ({compName, options, map, map_link}) => {

  return (
    <div className={css.main + compName}>
      <Vcard {...options} modifier='compact' pin/>
      <a href={map_link} className="map" target="_blank">
        <RespImageCover image={map} />
      </a>
    </div>
  )
}

export default Gmap
