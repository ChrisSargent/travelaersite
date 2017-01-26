import React from 'react'
import {connect} from 'react-redux'
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

const mapStateToProps = (state) => ({displayLoader: state.loading.length})
export default connect(mapStateToProps)(Loader)
