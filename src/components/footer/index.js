import React, {Component} from 'react';
import PageStore from '../../stores/PageStore';

import Credit from '../credit';
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

    return (
      <footer className="site-footer">
        <div className="content-footer">
          <div className="item">
            <Logo />
          </div>
          <div className="item">
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
            <Credit text={footerAppend}/>
            <Legal legalName={props.legalName} />
          </div>
          <div className="item">
            {props.socialNetworks && <Social socialNetworks={props.socialNetworks} />}
            {props.externalLinks && <Links externalLinks={props.externalLinks} />}
          </div>
        </div>
      </footer>
    );
  }
}
