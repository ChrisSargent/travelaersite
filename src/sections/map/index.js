import React from 'react'
import {connect} from 'react-redux'
import {getOptions} from '../../reducers/site'
import css from '../../lib/css'
import RespImageCover from '../../components/resp-image-cover'
import Vcard from '../../components/vcard'
import './_map.sass'

const Gmap = ({compName, options, map, map_link}) => {

  return (
    <div className={css.main + compName}>
      <Vcard options={options} pin />
      <a href={map_link} className="map">
        <RespImageCover image={map} />
      </a>
    </div>
  )
}

const mapStateToProps = (state) => ({options: getOptions(state)})
export default connect(mapStateToProps)(Gmap)
