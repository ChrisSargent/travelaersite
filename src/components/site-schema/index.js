import React from 'react'
import {connect} from 'react-redux'
import {getOptions} from '../../reducers/site'
import {globals} from '../../lib/utils'

const SiteMeta = ({options}) => {
  if (!options)
    return null

  const sameAs = options.socialNetworks.map((network) => {
    return network.link;
  })

  const data = {
    "@context": "http://schema.org",
    "@type": "Organization",
    "@id": globals.baseUrl,
    "url": globals.baseUrl,
    "name": options.t_site_info.name,
    "legalName": options.legalName,
    "taxID": options.coRegNumber,
    "vatID": options.coTaxNumber,
    "telephone": options.contactTelephone,
    "logo": options.siteLogo,
    "address": {
      "streetAddress": [options.streetAddress1, options.streetAddress2].join(', '),
      "postalCode": options.postalCode,
      "addressLocality": options.locality,
      "addressRegion": options.region,
      "addressCountry": options.country
    },
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "telephone": options.contactTelephone,
        "contactType": "Sales & Customer Service",
        "email": options.contactEmail,
        "faxNumber": options.contactFax,
      }
    ],
    "sameAs": sameAs
  }

  return (
    <script type="application/ld+json">
      {JSON.stringify(data)}
    </script>
  )
}
const mapStateToProps = (state) => ({options: getOptions(state)})
export default connect(mapStateToProps)(SiteMeta)
