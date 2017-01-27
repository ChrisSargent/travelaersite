import React from 'react'
import css from '../../lib/css'
import Logo from '../logo'
import MenuContainer from '../menu'
import './_header.sass'

const Header = () => {
  const compName = 'siteheader'

  return (
    <header className={css.header + compName}>
      <div className={css.container}>
        <Logo/>
        <MenuContainer location="primary"/>
      </div>
    </header>
  )
}

export default Header
