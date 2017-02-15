import React, {Component} from 'react'
import {connect} from 'react-redux'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import {getDisplaySubmenu} from '../../reducers/pages'
import {observableFonts} from '../../lib/css'
import {fetchMenu, fetchOptions} from '../../actions/site'
import FontFaceObserver from 'fontfaceobserver'
import Footer from '../../components/footer'
import Head from '../../components/head'
import Header from '../../components/header'
import Loader from '../../components/loader/'
import SiteSchema from '../../components/site-schema/'
import '../../lib/sass/index.sass'
import './_base.sass'

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
      <ReactCSSTransitionGroup component="div" transitionName="base" transitionEnterTimeout={700} transitionLeaveTimeout={700}>
        <Head/>
        <Header hasSubMenu={hasSubMenu}/>
        {React.cloneElement(children, {key: location.pathname})}
        <Footer/>
        <Loader/>
        <SiteSchema/>
      </ReactCSSTransitionGroup>
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
