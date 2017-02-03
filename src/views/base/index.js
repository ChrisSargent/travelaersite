import React from 'react'
import Helmet from 'react-helmet'
import {connect} from 'react-redux'
import {getOptions} from '../../reducers/site'
import {getDisplaySubmenu} from '../../reducers/pages'
import Footer from '../../components/footer'
import Header from '../../components/header'
import Loader from '../../components/loader/'

const Base = (props) => {
  var metaInfo
  const {options, hasSubMenu} = props

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
      {props.children}
      <Footer/>
      <Loader/>
    </div>
  )
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
