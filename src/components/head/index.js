import React from 'react'
import {connect} from 'react-redux'
import withRouter from 'react-router/lib/withRouter'
import {globals} from '../../lib/utils'
import {getOptions} from '../../reducers/site'
import Helmet from 'react-helmet'

const Head = ({options, location}) => {
  if (!options)
    return null

  const currentURL = globals.baseUrl + location.pathname
  const metaInfo = {
    htmlAttributes: {
      lang: options.t_site_info.language
    },
    title: options.t_site_info.description,
    titleTemplate: '%s | ' + options.t_site_info.name,
    meta: [
      {
        name: 'description',
        content: options.t_site_info.description
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
        content: options.t_site_info.description
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
    link: []
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

  if (options.fabSocialImg) {
    metaInfo.meta.push({
      property: "og:image",
      content: options.fabSocialImg.url
    }, {
      property: "og:image:type",
      content: options.fabSocialImg.mime_type
    }, {
      property: "og:image:width",
      content: options.fabSocialImg.width
    }, {
      property: "og:image:height",
      content: options.fabSocialImg.height
    })
  }

  if (options.gPlusID) {
    metaInfo.link.push({
      rel: 'publisher',
      href: 'https://plus.google.com/' + options.gPlusID
    })
  }

  return <Helmet {...metaInfo}/>
}

const mapStateToProps = (state) => ({options: getOptions(state)})
export default withRouter(connect(mapStateToProps)(Head))
