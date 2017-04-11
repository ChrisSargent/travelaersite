import React, {PureComponent} from 'react'
import css from '../../lib/css'
import Logo from '../logo'
import Menu from '../menu'
import './_header.sass'

class Header extends PureComponent {

  render() {
    const compName = 'siteheader'

    return (
      <header className={css.header + compName}>
        <div className={css.container}>
          <Logo/>
          <Menu/>
        </div>
      </header>
    )
  }

}

export default Header
