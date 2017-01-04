import React, {Component} from 'react';
import css from '../../lib/css';
import PageStore from '../../stores/PageStore';

import Legal from '../legal';
import Links from '../links';
import Logo from '../logo';
import Social from '../social';
import Vcard from '../vcard';

require('./_footer.sass');

export default class Footer extends Component {
  constructor() {
    super();
    this.requestPageFooterAppend = this.requestPageFooterAppend.bind(this);
    this.state = {
      footerAppend: PageStore.getPageFooterAppend()
    };
  }

  componentWillMount() {
    PageStore.on('change', this.requestPageFooterAppend);
  }

  componentWillUnmount() {
    PageStore.removeListener('change', this.requestPageFooterAppend);
  }

  requestPageFooterAppend() {
    this.setState({footerAppend: PageStore.getPageFooterAppend()});
  }

  render() {
    const {props} = this;
    const {footerAppend} = this.state;
    const compName = 'sitefooter';

    return (
      <footer className={css.footer + compName + ' -skewtop'}>
        <div className={css.container}>
          <div className={css.main + compName}>
            <div className={css.item}>
              <Logo />
            </div>
            <div className={css.item}>
              <Vcard
                coRegNumber={props.coRegNumber}
                coTaxNumber={props.coTaxNumber}
                contactEmail={props.contactEmail}
                contactFax={props.contactFax}
                contactPerson={props.contactPerson}
                contactTelephone={props.contactTelephone}
                country={props.country}
                locality={props.locality}
                postalCode={props.postalCode}
                region={props.region}
                streetAddress1={props.streetAddress1}
                streetAddress2={props.streetAddress2}
                />
            </div>
            <div className={css.item}>
              <Social socialNetworks={props.socialNetworks} modifier='condensed' />
              <Links externalLinks={props.externalLinks} />
            </div>
          </div>
          <Legal legalName={props.legalName} credit={footerAppend} />
        </div>
        <div className="_sectionbg _skew">
          <div className="_skewcorrect"></div>
        </div>
      </footer>
    );
  }
}
