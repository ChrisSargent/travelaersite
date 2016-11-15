import React from 'react';

require('./_vcard.sass');

function Vcard(props) {
  return (
    <div className="vcard">
      <div className="vc__col">
        <a className="fn org url" href="{site.url}"><span className="organization-name">site.name</span></a>
        <div className="adr">
          {props.streetAddress1 && <span className="street-address">{props.streetAddress1}{props.streetAddress2 && <span>{props.streetAddress2}</span>}</span>}
          {props.postalCode && <span className="postal-code">{props.postalCode}&nbsp;</span> }
          {props.locality && <span className="locality">{props.locality},&nbsp;</span> }
          {props.region && <span className="region">{props.region},&nbsp;</span> }
          {props.country && <span className="country">{props.country}</span> }
          <span className="stop">.</span>
        </div>
      </div>
      <div className="vc__col">
        {props.contactPerson && <span className="fn">{props.contactPerson}</span> }
        <span className="contacts">
          {props.contactTelephone && <span className="vcard__item"><span>Tel:&nbsp;</span><a href="tel:{props.contactTelephone}" className="tel" rel="nofollow">{props.contactTelephone}</a></span> }
          {props.contactFax && <span className="vcard__item"><span>Fax:&nbsp;</span><a href="fax:{props.contactFax}" className="fax" rel="nofollow">{props.contactFax}</a></span> }
          {props.contactEmail && <span className="vcard__item"><span>Email:&nbsp;</span><a className="email" href="mailto:{props.contactEmail}">{props.contactEmail}</a></span> }
        </span>
        {props.coRegNumber && <span className="vcard__item"><span>Company Registration Number:&nbsp;</span>{props.coRegNumber}</span> }
        {props.coTaxNumber && <span className="vcard__item"><span>Company Tax Number:&nbsp;</span>{props.coTaxNumber}</span> }
      </div>
    </div>
  );
}

export default Vcard;
