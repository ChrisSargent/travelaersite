import React from 'react'
import Helmet from 'react-helmet'
import {connect} from 'react-redux'
import Footer from '../../components/footer'
import Header from '../../components/header'
import Loader from '../../components/loader/'

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
      <Loader/>
    </div>
  )
}

const mapStateToProps = (state) => ({options: state.site.options})
export default connect(mapStateToProps)(Base)
