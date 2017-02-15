import React from 'react'
import css from '../../lib/css'
import Logo from '../logo'
import Menu from '../menu'
import './_header.sass'

const Header = (props) => {
  const compName = 'siteheader'

  return (
    <header className={css.header + compName}>
      <div className={css.container}>
        <Logo/>
        <Menu />
      </div>
    </header>
  )
}

export default Header
