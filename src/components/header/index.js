import React from 'react'
import css from '../../lib/css'
import Logo from '../logo'
import MenuContainer from '../menu'
import './_header.sass'

const Header = (props) => {
  var headerClass = ''
  const {hasSubMenu} = props
  const compName = 'siteheader'

  console.log(hasSubMenu);

  hasSubMenu && (headerClass = ' -hassubmenu')

  return (
    <header className={css.header + compName + headerClass}>
      <div className={css.container}>
        <Logo/>
        <MenuContainer location="primary"/>
      </div>
    </header>
  )
}

export default Header
