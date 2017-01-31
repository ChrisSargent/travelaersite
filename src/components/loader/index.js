import React from 'react'
import {connect} from 'react-redux'
import {getLoading} from '../../reducers/loading'
import {backgroundFetchPages} from '../../actions/pages'
import {getFetchedAllPages} from '../../reducers/pages'
import css from '../../lib/css'
import SVG from '../svg'
import './_loader.sass'

const Loader = ({getLoading, getFetchedAllPages, backgroundFetchPages}) => {
  var loadingClass

  getLoading
    ? loadingClass = css.loading
    : loadingClass = ''

  if (!getLoading && !getFetchedAllPages) {
    // If we've finished loading and we haven't fetch all the pages in the background yet, do it!
    setTimeout(function () {
      window.requestAnimationFrame(function() {
        backgroundFetchPages()
      })
    }, 2000);
  }

  return (
    <div className={css.loader + loadingClass}>
      <SVG type="spinner"/>
    </div>
  )
}

const mapStateToProps = (state) => ({
  getLoading: getLoading(state),
  getFetchedAllPages: getFetchedAllPages(state)
})

const mapDispatchToProps = (dispatch) => ({
  backgroundFetchPages() {
    dispatch(backgroundFetchPages())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Loader)
