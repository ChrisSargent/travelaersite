import React from 'react'
import {connect} from 'react-redux'
import Helmet from 'react-helmet'

// Components
import Footer from '../../components/footer'
import Header from '../../components/header'
// import Loader from '../../components/loader/'
// <Loader/>

const Base = (props) => {
  var metaInfo, footerAppend
  const {options} = props

  footerAppend = 'PHOTOCREDIT: TO ADD BACK IN'

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
      <Header/>
      {React.cloneElement(props.children, {options: options})}
      <Footer options={options} footerAppend={footerAppend}/>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {options: state.site.options}
}

const BaseContainer = connect(mapStateToProps)(Base)
export default BaseContainer
