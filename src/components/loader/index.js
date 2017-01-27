import React from 'react'
import {connect} from 'react-redux'
import {getLoading} from '../../reducers/loading'
import css from '../../lib/css'
import SVG from '../svg'
import './_loader.sass'

const Loader = ({displayLoader}) => {
  var loadingClass

  displayLoader
    ? loadingClass = css.loading
    : loadingClass = ''

  return (
    <div className={css.loader + loadingClass}>
      <SVG type="spinner"/>
    </div>
  )
}

const mapStateToProps = (state) => ({displayLoader: getLoading(state)})
export default connect(mapStateToProps)(Loader)
