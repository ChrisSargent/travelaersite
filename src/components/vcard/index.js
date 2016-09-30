import React from 'react';

function Vcard(props) {
  return (
    <div className="vcard">
      <a className="fn org url" href="{site.url}"><span className="organization-name">site.name</span></a>
      <span className="adr">
        {props.streetAddress1 ? <span className="street-address">{props.streetAddress1}</span> : false}
        {props.streetAddress2 ? <span className="street-address">{props.streetAddress2}</span> : false}
        {props.postalCode ? <span className="postal-code">{props.postalCode}</span> : false}
        {props.locality ? <span className="locality">{props.locality}</span> : false}
        {props.region ? <span className="region">{props.region}</span> : false}
        {props.country ? <span className="country">{props.country}</span> : false}
        <span className="stop">.</span>
      </span>
      {props.contactPerson ? <span className="fn">{props.contactPerson}</span> : false}
      <span className="contacts">
        {props.contactTelephone ? <span className="label--tel">Tel:&nbsp;<a href="tel:{props.contactTelephone}" className="tel" rel="nofollow">{props.contactTelephone}</a></span> : false}
        {props.contactFax ? <span className="label--fax">Fax:&nbsp;<a href="fax:{props.contactFax}" className="fax" rel="nofollow">{props.contactFax}</a></span> : false}
        {props.contactEmail ? <span className="label--email">Email:&nbsp;<a className="email" href="mailto:{props.contactEmail}">{props.contactEmail}</a></span> : false}
      </span>
      {props.coRegNumber ? <span className="label--coreg">{props.coRegNumber}</span> : false}
      {props.coTaxNumber ? <span className="label--cotax">{props.coTaxNumber}</span> : false}
    </div>
  );
}

export default Vcard;
