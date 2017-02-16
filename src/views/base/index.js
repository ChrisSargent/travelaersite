import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getDisplaySubmenu} from '../../reducers/pages'
import {observableFonts} from '../../lib/css'
import {fetchMenu, fetchOptions} from '../../actions/site'
import FontFaceObserver from 'fontfaceobserver'
import Footer from '../../components/footer'
import Header from '../../components/header'
import Loader from '../../components/loader/'
import SiteSchema from '../../components/site-schema/'
import '../../lib/sass/index.sass'

class Base extends Component {
  componentDidMount() {
    this.observeFonts()
    this.props.fetchMenu('primary')
    this.props.fetchOptions()
  }

  static fetchData(store) {
    return Promise.all([
      store.dispatch(fetchMenu('primary')),
      store.dispatch(fetchOptions())
    ])
  }

  shouldComponentUpdate(nextProps) {
    // TODO: Not really sure if we need this
    if (nextProps.location.pathname === this.props.location.pathname) {
      return false
    } else {
      return true
    }
  }

  observeFonts() {
    observableFonts.map((font) => {
      const observedFont = new FontFaceObserver(font.family);
      observedFont.load(null, 5000).then(() => {
        document.body.className += ' ' + font.id;
      }, () => {
        console.log(font.family + ' is not available after waiting 5 seconds');
      });
      return observedFont
    })
  }

  render() {
    const {hasSubMenu, children} = this.props
    return (
      <div>
        <Header/>
        {React.cloneElement(children, {key: location.pathname, hasSubMenu: hasSubMenu})}
        <Footer/>
        <Loader/>
        <SiteSchema/>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return ({
    hasSubMenu: getDisplaySubmenu(state, ownProps.location.pathname)
  })
}

const mapDispatchToProps = (dispatch) => ({
  fetchMenu(location) {
    dispatch(fetchMenu(location))
  },
  fetchOptions() {
    dispatch(fetchOptions())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Base)
