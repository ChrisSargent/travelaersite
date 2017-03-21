import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import Link from 'react-router/lib/Link'
import IndexLink from 'react-router/lib/IndexLink'
import {getMenu} from '../../reducers/site'
import {globals, toRelative} from '../../lib/utils'
import css from '../../lib/css'
import MenuToggle from '../menu-toggle'
import './_menu.sass'

const MenuItem = ({item, compName}) => {
  var LinkType = Link,
    linkClass
  const itemLink = toRelative(item.url)

  linkClass = css.link + compName
  item.children.length > 0 && (linkClass += " -hassub")

  itemLink === globals.homeUrl && (LinkType = IndexLink)

  return (
    <li className={css.item}>
      <LinkType to={itemLink} className={linkClass} activeClassName={css.active}>{item.title}</LinkType>
      <SubMenuList items={item.children}/>
    </li>
  )
}

const SubMenuList = ({items}) => {
  if (!items.length)
    return null

  const compName = 'submenu'
  const itemsMap = items.map((item) => {
    return (<MenuItem key={item.ID} item={item} compName={compName}/>)
  })

  return (
    <div className={css.main + compName}>
      <div className={css.container}>
        <ul className={css.list + compName}>{itemsMap}</ul>
      </div>
    </div>
  )
}

const MenuList = ({items, onClick}) => {
  if (!items)
    return null

  const compName = 'menu'
  const itemsMap = items.map((item) => {
    return (<MenuItem key={item.ID} item={item} compName={compName}/>)
  })

  return (
    <ul className={css.list + compName} onClick={onClick}>{itemsMap}</ul>
  )
}

class Menu extends PureComponent {

  constructor() {
    super()
    this.closeMenu = this.closeMenu.bind(this)
    this.refMenu = this.refMenu.bind(this)
    this.state = {
      atTop: true
    }
    this.checkbox = {}
  }

  refMenu(el) {
    this.checkbox = el
  }

  closeMenu() {
    this.checkbox.checked = false
  }

  render() {
    const {menu} = this.props
    const compName = 'menu'

    if (!menu)
      return null

    return (
      <nav className={css.main + compName}>
        <input type="checkbox" ref={this.refMenu} id={css.toggle + compName}/>
        <MenuToggle controls={css.toggle + compName}/>
        <MenuList items={menu} onClick={this.closeMenu}/>
      </nav>
    )

  }
}

const mapStateToProps = (state, ownProps) => ({menu: getMenu(state)})
export default connect(mapStateToProps)(Menu)
