import React from 'react'
import Helmet from 'react-helmet'
import {connect} from 'react-redux'
import {getOptions, getHasSubMenu} from '../../reducers/site'
import Footer from '../../components/footer'
import Header from '../../components/header'
import Loader from '../../components/loader/'

const Base = (props) => {
  var metaInfo
  const {options, getHasSubMenu} = props

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
      <Header hasSubMenu={getHasSubMenu}/>
      {props.children}
      <Footer/>
      <Loader/>
    </div>
  )
}

const mapStateToProps = (state, ownProps) => ({
  options: getOptions(state),
  getHasSubMenu: getHasSubMenu(state, ownProps.location.pathname),
})
export default connect(mapStateToProps)(Base)
