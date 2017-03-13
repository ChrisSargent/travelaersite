import React from 'react'
import SVG from '../svg'
import './_member-vcard.sass'

const MemberVcard = ({name, contacts}) => {
  var contactsMap

  if (contacts) {
    contactsMap = contacts.map((contact, index) => {
      const {contact_detail, contact_type, link_icon, link_url} = contact
      var link, icon

      switch (contact_type) {
        case 'phone':
          link = 'tel:+' + parseFloat(contact_detail.replace(/\D/g,''))
          icon = contact_type
          break

        case 'email':
          link = 'mailto:' + contact_detail
          icon = contact_type
          break

        case 'skype':
          link = 'skype:' + contact_detail
          icon = contact_type
          break

        case 'link':
          link = link_url
          icon = link_icon
          break

        default:
          return false
      }

      return (
        <li key={index}>
          <SVG type={icon} />
          <a className="link" href={link} target="_blank">{contact_detail}</a>
        </li>
      )
    })
  }

  return (
    <aside className="vcard-member">
      <ul>
        {contactsMap}
      </ul>
    </aside>
  )
}

export default MemberVcard
