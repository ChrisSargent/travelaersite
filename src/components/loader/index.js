import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import {getLoading} from '../../reducers/loading'
import {backgroundFetchPages} from '../../actions/pages'
import {getFetchedAllPages} from '../../reducers/pages'
import css from '../../lib/css'
import SVG from '../svg'
import './_loader.sass'

class Loader extends PureComponent {
  constructor (props) {
    super(props)
    this.backgroundFetch = this.backgroundFetch.bind(this)
  }

  componentDidMount() {
    this.backgroundFetch()
  }

  backgroundFetch() {
    const {getLoading, getFetchedAllPages, backgroundFetchPages} = this.props
    // Put this in a lifecycle function that doesn't get called in the SSR render because window is not available
    !getLoading && !getFetchedAllPages && setTimeout(() => {
      // If we've finished loading and we haven't fetched all the pages yet, do it in the background!
      backgroundFetchPages()
    }, 2000);
  }

  render() {
    var loadingClass = ''
    const {getLoading} = this.props
    getLoading && (loadingClass = css.loading)

    return (
      <div className={css.loader + loadingClass}>
        <SVG type="loader"/>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({getLoading: getLoading(state), getFetchedAllPages: getFetchedAllPages(state)})
const mapDispatchToProps = (dispatch) => ({
  backgroundFetchPages() {
    dispatch(backgroundFetchPages())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Loader)
