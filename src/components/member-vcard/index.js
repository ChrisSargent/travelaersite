import React from 'react'
import SVG from '../svg'
import './_member-vcard.sass'

const MemberVcard = ({name, contacts}) => {
  var contactsMap

  if (contacts) {
    contactsMap = contacts.map((contact, index) => {
      const {contact_detail, contact_type} = contact
      var link

      switch (contact_type) {
        case 'phone':
          link = 'tel:' + contact_detail
          break

        case 'twitter':
          link = 'https://twitter.com/' + contact_detail
          break

        case 'email':
          link = 'mailto:' + contact_detail
          break

        default:
          return false
      }
      return (
        <li key={index}>
          <SVG type={contact_type} />
          <a className="link" href={link} target="_blank">{contact_detail}</a>
        </li>
      )
    })
  }

  return (
    <aside className="vcard-member">
      {name && <div className="fn">{name}</div> }
      <ul>
        {contactsMap}
      </ul>
    </aside>
  )
}

export default MemberVcard
