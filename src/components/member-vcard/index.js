import React from 'react';
import Icon from '../icons';

require('./_member-vcard.sass');

function MemberVcard(props) {
  const {name, contacts} = props;
  var contactsMap

  if (contacts) {
    contactsMap = contacts.map((contact, index) => {
      const {contact_detail, contact_type} = contact;
      var link;

      switch (contact_type) {
        case 'phone':
          link = 'tel:' + contact_detail;
          break;

        case 'twitter':
          link = 'https://twitter.com/' + contact_detail;
          break;

        case 'email':
          link = 'mailto:' + contact_detail;
          break;

        default:
          return false;
      }
      return (
        <div key={index}>
          <Icon type={contact_type} />
          <a className="link" href={link} target="_blank">{contact_detail}</a>
        </div>
      );
    });
  }

  return (
    <aside className="member-vcard">
      {name && <div className="fn">{name}</div> }
      {contactsMap}
    </aside>
  )
}

export default MemberVcard;
