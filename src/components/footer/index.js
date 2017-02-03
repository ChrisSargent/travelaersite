import React from 'react'
import {connect} from 'react-redux'
import {getOptions} from '../../reducers/site'
import {getPageAppend} from '../../reducers/pages'
import css from '../../lib/css'
import Legal from '../legal'
import Links from '../links'
import Logo from '../logo'
import Social from '../social'
import Vcard from '../vcard'
import './_footer.sass'

const Footer = ({options, footerAppend}) => {
  if(!options)
    return null

  const compName = 'sitefooter'

  return (
    <footer className={css.footer + compName + ' -skewtop'}>
      <div className={css.container}>
        <div className={css.main + compName}>
          <div className={css.item}>
            <Logo />
          </div>
          <div className={css.item}>
            <Vcard
              coRegNumber={options.coRegNumber}
              coTaxNumber={options.coTaxNumber}
              contactEmail={options.contactEmail}
              contactFax={options.contactFax}
              contactPerson={options.contactPerson}
              contactTelephone={options.contactTelephone}
              country={options.country}
              locality={options.locality}
              postalCode={options.postalCode}
              region={options.region}
              streetAddress1={options.streetAddress1}
              streetAddress2={options.streetAddress2}
              />
          </div>
          <div className={css.item}>
            <Social socialNetworks={options.socialNetworks} modifier='condensed' />
            <Links externalLinks={options.externalLinks} />
          </div>
        </div>
        <Legal legalName={options.legalName} credit={footerAppend} />
      </div>
      <div className="section-background _skew">
        <div className="_skewcorrect"></div>
      </div>
    </footer>
  )
}

const mapStateToProps = (state, ownProps) => ({
  options: getOptions(state),
  footerAppend: getPageAppend(state)
})
export default connect(mapStateToProps)(Footer)
