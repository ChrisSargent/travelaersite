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
    const {options, htmlClass, location, title, description, image} = this.props

    if (!options)
      return null

    const currentURL = globals.baseUrl + location.pathname
    const chosenTitle = title || options.t_site_info.description
    const chosenDesc = description || options.t_site_info.description
    const chosenImage = image || options.fabSocialImg

    const metaInfo = {
      htmlAttributes: {
        lang: options.t_site_info.language,
        class: htmlClass
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
          content: options.og_type
        }, {
          property: 'og:title',
          content: title || options.t_site_info.name
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
          content: options.og_locale
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
          content: options.postalCode
        }, {
          property: 'business:contact_data:country_name',
          content: options.country
        }
      ],
      link: [
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
        content: chosenImage.sizes['large']
      }, {
        property: 'og:image:type',
        content: chosenImage.mime_type
      }, {
        property: 'og:image:width',
        content: chosenImage.sizes['large-width']
      }, {
        property: 'og:image:height',
        content: chosenImage.sizes['large-height']
      })
    }

    if (options.gPlusID) {
      metaInfo.link.push({
        rel: 'publisher',
        href: 'https://plus.google.com/' + options.gPlusID
      })
    }

    if (options.google_tracking_code) {
      metaInfo.script = [
        {
          innerHTML: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','GTM-KTF4Z9');`
        }
      ]
    }
    this.metaInfo = metaInfo
  }

  render() {
    return <Helmet {...this.metaInfo}/>
  }
}

const mapStateToProps = (state) => ({options: getOptions(state)})
export default withRouter(connect(mapStateToProps)(Head))
