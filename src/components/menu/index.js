import React, {Component} from 'react'
import {connect} from 'react-redux'
import {IndexLink, Link} from 'react-router'
import {fetchMenu} from '../../actions/SiteActions'
import css from '../../lib/css'
import {globals, stripDomain} from '../../lib/utils'

import MenuToggle from '../menu-toggle'

import './_menu.sass'

function MenuItem(props) {
  var LinkType,
    linkClass
  const {item} = props
  const compName = 'menu'
  const itemLink = stripDomain(item.url)

  linkClass = css.link + compName
  item.children.length > 0 && (linkClass += " -hassub")

  itemLink === globals.homeUrl
    ? LinkType = IndexLink
    : LinkType = Link

  return (
    <li className={css.item}>
      <LinkType to={itemLink} className={linkClass} activeClassName={css.active}>{item.title}</LinkType>
      <SubMenuList items={item.children}/>
    </li>
  )
}

function SubMenuList(props) {
  const {items} = props
  const compName = 'submenu'

  if (!items.length)
    return null

  const itemsMap = items.map((item) => {
    return (<MenuItem key={item.ID} item={item}/>)
  })

  return (
    <div className={css.main + compName}>
      <div className={css.container}>
        <ul className={css.list + compName}>{itemsMap}</ul>
      </div>
    </div>
  )
}

function MenuList(props) {
  const {items, onClick} = props
  const compName = 'menu'

  if (!items)
    return null

  const itemsMap = items.map((item) => {
    return (<MenuItem key={item.ID} item={item}/>)
  })

  return (
    <ul className={css.list + compName} onClick={onClick}>{itemsMap}</ul>
  )
}

class Menu extends Component {

  constructor(props) {
    super(props)
    this.closeMenu = this.closeMenu.bind(this)
    this.refMenu = this.refMenu.bind(this)
    this.state = {
      atTop: true
    }
    this.checkbox = {}
    this.debounceScroll = this.debounceScroll.bind(this)
    this.handleScroll = this.handleScroll.bind(this)
    this.resizeTOut = null
    // TODO: Remove code for scroll event if not using
  }

  componentWillMount() {
    window.addEventListener('scroll', this.debounceScroll)
  }

  refMenu(el) {
    this.checkbox = el
  }

  closeMenu() {
    this.checkbox.checked = false
  }

  debounceScroll(ev) {
    clearTimeout(this.resizeTOut)
    this.resizeTOut = setTimeout(() => this.handleScroll(ev.srcElement.body.scrollTop), 100)
  }

  handleScroll(pos) {
    if (pos >= 200 && this.state.atTop)
      this.setState({atTop: false})

    if (pos < 200 && !this.state.atTop)
      this.setState({atTop: true})
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

const mapStateToProps = (state, ownProps) => {
  return {menu: state.site.menu}
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    init: dispatch(fetchMenu(ownProps.location))
  }
}

const MenuContainer = connect(mapStateToProps, mapDispatchToProps)(Menu)
export default MenuContainer
