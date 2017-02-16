import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import withRouter from 'react-router/lib/withRouter'
import {globals} from '../../lib/utils'
import {getOptions} from '../../reducers/site'
import Helmet from 'react-helmet'

class Head extends PureComponent {
  constructor(props) {
    super(props)
    this.setupHead()
  }

  setupHead() {
    const {options, location, title, description, image} = this.props

    if (!options)
      return null

    const currentURL = globals.baseUrl + location.pathname
    const chosenTitle = title || options.t_site_info.description
    const chosenDesc = description || options.t_site_info.description
    const chosenImage = image || options.fabSocialImg

    const metaInfo = {
      htmlAttributes: {
        lang: options.t_site_info.language
      },
      title: chosenTitle,
      titleTemplate: '%s | ' + options.t_site_info.name,
      meta: [
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1'
        }, {
          name: 'description',
          content: chosenDesc
        }, {
          name: 'keywords',
          content: options.t_site_info.defaultKeywords
        }, {
          name: 'author',
          content: options.contactPerson
        }, {
          property: 'og:type',
          content: 'website'
        }, {
          property: 'og:title',
          content: options.t_site_info.name
        }, {
          property: 'og:description',
          content: chosenDesc
        }, {
          property: 'og:url',
          content: currentURL
        }, {
          property: 'og:site_name',
          content: options.t_site_info.name
        }, {
          property: 'og:locale',
          content: 'en_US'
        }, {
          property: 'business:contact_data:street_address',
          content: [options.streetAddress1, options.streetAddress2].join(', ')
        }, {
          property: 'business:contact_data:locality',
          content: options.locality
        }, {
          property: 'business:contact_data:region',
          content: options.region
        }, {
          property: 'business:contact_data:postal_code',
          content: options.postal_code
        }, {
          property: 'business:contact_data:country_name',
          content: options.country
        }
      ],
      link: [
        {
          rel: 'stylesheet',
          href: '/static/css/main.css'
        }, {
          rel: 'shortcut icon',
          href: '/favicon.ico'
        }
      ]
    }

    if (options.pinVerifCode) {
      metaInfo.meta.push({name: 'p:domain_verify', content: options.pinVerifCode})
    }

    if (options.bingVerifCode) {
      metaInfo.meta.push({name: 'msvalidate.01', content: options.bingVerifCode})
    }

    if (options.fbID) {
      metaInfo.meta.push({property: 'fb:profile_id', content: options.fbID})
    }

    if (options.fbAdmins) {
      metaInfo.meta.push({property: 'fb:admins', content: options.fbAdmins.join()})
    }

    if (options.fbAppID) {
      metaInfo.meta.push({property: 'fb:app_id', content: options.app_id})
    }

    if (chosenImage) {
      metaInfo.meta.push({
        property: 'og:image',
        content: chosenImage.url
      }, {
        property: 'og:image:type',
        content: chosenImage.mime_type
      }, {
        property: 'og:image:width',
        content: chosenImage.width
      }, {
        property: 'og:image:height',
        content: chosenImage.height
      })
    }

    if (options.gPlusID) {
      metaInfo.link.push({
        rel: 'publisher',
        href: 'https://plus.google.com/' + options.gPlusID
      })
    }
    this.metaInfo = metaInfo
  }

  render() {
    return <Helmet {...this.metaInfo}/>
  }
}

const mapStateToProps = (state) => ({options: getOptions(state)})
export default withRouter(connect(mapStateToProps)(Head))
