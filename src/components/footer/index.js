import React, {Component} from 'react';
import PageStore from '../../stores/PageStore';

import Legal from '../legal';
import Links from '../links';
import Logo from '../logo';
import Social from '../social';
import Vcard from '../vcard';

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

    return (
      <footer>
        <Logo/>
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
        <div>
          {props.socialNetworks ? <Social socialNetworks={props.socialNetworks} /> : false}
          {props.externalLinks ? <Links externalLinks={props.externalLinks} /> : false}
        </div>
        <Legal legalName={props.legalName} append={this.state.footerAppend}/>
      </footer>
    );
  }
}
