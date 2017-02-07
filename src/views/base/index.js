import React, {Component} from 'react'
import {observableFonts} from '../../lib/css'
import FontFaceObserver from 'fontfaceobserver'
import {connect} from 'react-redux'
import {getDisplaySubmenu} from '../../reducers/pages'
import Footer from '../../components/footer'
import Head from '../../components/head'
import Header from '../../components/header'
import Loader from '../../components/loader/'
import SiteSchema from '../../components/site-schema/'

class Base extends Component {
  constructor() {
    super()
    this.observeFonts()
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
    const {hasSubMenu} = this.props

    return (
      <div>
        <Head/>
        <Header hasSubMenu={hasSubMenu}/>
        {this.props.children}
        <Footer/>
        <Loader/>
        <SiteSchema />
      </div>
    )

  }
}

const mapStateToProps = (state, ownProps) => {
  return ({
    hasSubMenu: getDisplaySubmenu(state, ownProps.location.pathname)
  })
}

export default connect(mapStateToProps)(Base)
