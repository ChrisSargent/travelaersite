import React, {Component} from 'react'
import Helmet from 'react-helmet'
import {observableFonts} from '../../lib/css'
import FontFaceObserver from 'fontfaceobserver'
import {connect} from 'react-redux'
import {getOptions} from '../../reducers/site'
import {getDisplaySubmenu} from '../../reducers/pages'
import Footer from '../../components/footer'
import Header from '../../components/header'
import Loader from '../../components/loader/'


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
      var metaInfo
      const {options, hasSubMenu} = this.props

      if (options) {
        metaInfo = {
          htmlAttributes: {
            lang: options.t_site_info.language
          },
          title: options.t_site_info.description,
          titleTemplate: '%s | ' + options.t_site_info.name,
          meta: []
        }
      }

      return (
        <div>
          {metaInfo && <Helmet {...metaInfo}/>}
          <Header hasSubMenu={hasSubMenu}/>
          {this.props.children}
          <Footer/>
          <Loader/>
        </div>
      )

  }
}

const mapStateToProps = (state, ownProps) => {
  const options = getOptions(state)
  const hasSubMenu = getDisplaySubmenu(state, ownProps.location.pathname)
  return ({
    options,
    hasSubMenu}
  )
}

export default connect(mapStateToProps)(Base)
