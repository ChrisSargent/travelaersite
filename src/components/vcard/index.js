import React, {Component} from 'react';

export default class Vcard extends Component {

  render() {
    const options = this.props;

    return (
      <div className="vcard">
          <a className="fn org url" href="{site.url}">
            <span className="organization-name">site.name</span>,
          </a>
        <span className="adr">
          {options.streetAddress1 ? <span className="street-address">{options.streetAddress1}</span> : false}
          {options.streetAddress2 ? <span className="street-address">{options.streetAddress2}</span> : false}
          {options.postalCode ? <span className="postal-code">{options.postalCode}</span> : false}
          {options.locality ? <span className="locality">{options.locality}</span> : false}
          {options.region ? <span className="region">{options.region}</span> : false}
          {options.country ? <span className="country">{options.country}</span> : false}
          <span className="stop">.</span>
        </span>
        {options.contactPerson ? <span className="fn">{options.contactPerson}</span> : false}
        <span className="contacts">
          {options.contactTelephone ? <span className="label--tel">Tel:&nbsp;<a href="tel:{options.contactTelephone}" className="tel" rel="nofollow">{options.contactTelephone}</a></span> : false}
          {options.contactFax ? <span className="label--fax">Fax:&nbsp;<a href="fax:{options.contactFax}" className="fax" rel="nofollow">{options.contactFax}</a></span> : false}
          {options.contactEmail ? <span className="label--email">Email:&nbsp;<a className="email" href="mailto:{options.contactEmail}">{options.contactEmail}</a></span> : false}
        </span>
        {options.coRegNumber ? <span className="label--coreg">{options.coRegNumber}</span> : false}
        {options.coTaxNumber ? <span className="label--cotax">{options.coTaxNumber}</span> : false}
      </div>
    );
  }
}
