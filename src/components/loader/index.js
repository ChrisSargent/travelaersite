import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import {getLoading} from '../../reducers/loading'
import {backgroundFetchPages} from '../../actions/pages'
import css from '../../lib/css'
import SVG from '../svg'
import './_loader.sass'

class Loader extends PureComponent {
  componentWillReceiveProps(newProps) {
    const {getLoading, backgroundFetchPages} = newProps
    // When we've finished loading try fetching rest of the pages in the background

    if (getLoading <= 0)
      backgroundFetchPages()
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

const mapStateToProps = (state) => ({getLoading: getLoading(state)})
const mapDispatchToProps = (dispatch) => ({
  backgroundFetchPages() {
    dispatch(backgroundFetchPages())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Loader)
