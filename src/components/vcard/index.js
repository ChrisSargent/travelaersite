import React from 'react'
import css from '../../lib/css'
import SVG from '../svg'
import './_vcard.sass'

const Vcard = ({options, pin}) => {
  if (!options)
    return null

  const compName = 'vcard-company'

  return (
    <div className={compName}>
      {pin && <SVG type="pin"/>}
      <div className={css.container}>
        {options.streetAddress1 && <span className="street">{options.streetAddress1}</span>}
        {options.streetAddress2 && <span className="street">{options.streetAddress2}</span>}
        {options.postalCode && <span className="postal-code">{options.postalCode}&nbsp;</span> }
        {options.locality && <span className="locality">{options.locality},&nbsp;</span> }
        {options.region && <span className="region">{options.region},&nbsp;</span> }
        {options.country && <span className="country">{options.country}</span> }
        <span className="stop">.</span>
      </div>
      <div className={css.container}>
        {options.contactTelephone && <span className={css.item + ' -tel'}><span className={css.label}>Tel:&nbsp;</span><a href={'tel:' + options.contactTelephone} rel="nofollow">{options.contactTelephone}</a></span> }
        {options.contactFax && <span className={css.item + ' -fax'}><span className={css.label}>Fax:&nbsp;</span><a href={'fax:' + options.contactFax} rel="nofollow">{options.contactFax}</a></span> }
        {options.contactEmail && <span className={css.item + ' -email'}><span className={css.label}>Email:&nbsp;</span><a href={'mailto:' + options.contactEmail} rel="nofollow">{options.contactEmail}</a></span> }
        {options.coRegNumber && <span className={css.item + ' -co'}><span className={css.label}>Company Registration Number:&nbsp;</span>{options.coRegNumber}</span> }
        {options.coTaxNumber && <span className={css.item + ' -co'}><span className={css.label}>Company Tax Number:&nbsp;</span>{options.coTaxNumber}</span> }
      </div>
    </div>
  )
}

export default Vcard
