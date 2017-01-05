import React, {Component} from 'react';
import css from '../../lib/css';
import globals from '../../lib/globals'

import MenuToggle from '../menu-toggle';
import NavStore from '../../stores/NavStore';
import {IndexLink, Link} from 'react-router';

import './_nav.sass';

function MenuItem(props) {
  const {item} = props;
  const compName = 'nav';
  var linkClass;

  // Is this the home page link?
  switch (item.object_id) {
    case 5:
      item.link = item.base;
      item.index = true;
      break;

    default:
      item.link = item.base + item.object_slug;
  }

  linkClass = css.link + compName;
  if (item.children.length > 0) {
    item.children.base = item.link + '/';
    linkClass += " -hassub";
  }

  return (
    <li className={css.item}>
      {item.index
        ? <IndexLink to={item.link} className={linkClass} activeClassName={css.active}>{item.title}</IndexLink>
        : <Link to={item.link} className={linkClass} activeClassName={css.active}>{item.title}</Link>}
      {item.children.length > 0 && <Menu items={item.children}/>}
    </li>
  );
}

function Menu(props) {
  const {items, onClick} = props;

  if (!items)
    return null;

  var primaryNav;

  items.base === globals.homeUrl
    ? primaryNav = true
    : primaryNav = false;

  const itemsMap = items.map((item) => {
    item.base = items.base;
    return (<MenuItem key={item.ID} item={item}/>);
  });

  if (primaryNav) {
    const compName = 'nav';
    return (
      <ul className={css.list + compName} onClick={onClick}>{itemsMap}</ul>
    );
  } else {
    const compName = 'subnav';
    return (
      <div className={css.main + compName}>
        <div className={css.container}>
          <ul className={css.list + compName}>{itemsMap}</ul>
        </div>
      </div>
    );
  }
}

export default class NavBlock extends Component {

  constructor() {
    super();
    this.requestMenu = this.requestMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
    this.refMenu = this.refMenu.bind(this);
    this.state = {
      atTop: true
    };
    this.checkbox = {};
    this.debounceScroll = this.debounceScroll.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.resizeTOut = null;
    // TODO: Remove code for scroll event if not using
  }

  componentWillMount() {
    this.requestMenu();
    window.addEventListener('scroll', this.debounceScroll);
    NavStore.on('change', this.requestMenu);
  }

  componentWillUnmount() {
    NavStore.removeListener('change', this.requestMenu);
  }

  requestMenu() {
    const menu = NavStore.getMenu(this.props.location);
    menu && (this.setState({menu: menu}));
  }

  refMenu(el) {
    this.checkbox = el;
  }

  closeMenu() {
    this.checkbox.checked = false;
  }

  debounceScroll(ev) {
    clearTimeout(this.resizeTOut);
    this.resizeTOut = setTimeout(() => this.handleScroll(ev.srcElement.body.scrollTop), 100);
  }

  handleScroll(pos) {
    if (pos >= 200 && this.state.atTop)
      this.setState({atTop: false})

    if (pos < 200 && !this.state.atTop)
      this.setState({atTop: true})
  }

  render() {
    const {menu} = this.state;
    if (!menu)
      return null;

    const compName = 'nav';
    menu.base = globals.homeUrl;

    return (
      <nav className={css.main + compName}>
        <input type="checkbox" ref={this.refMenu} id={css.toggle + compName}/>
        <MenuToggle controls={css.toggle + compName}/>
        <Menu items={menu} onClick={this.closeMenu}/>
      </nav>
    );

  }
}
