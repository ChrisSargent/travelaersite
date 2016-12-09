import React, {Component} from 'react';
import css from '../../lib/css';
import globals from '../../lib/globals'

import MenuToggle from '../menu-toggle';
import NavStore from '../../stores/NavStore';
import {IndexLink, Link} from 'react-router';

require('./_nav.sass');

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
  const {items} = props;

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
      <ul className={css.list + compName}>{itemsMap}</ul>
    );
  } else {
    const compName = 'subnav';
    return (
      <div className={css.block + compName}>
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
    this.requestMenu = this.requestMenu.bind(this); // This just ensures we're always binding properly to this.requestMenu
    this.state = {};
  }

  componentWillMount() {
    this.requestMenu();
    NavStore.on('change', this.requestMenu);
  }

  componentWillUnmount() {
    NavStore.removeListener('change', this.requestMenu);
  }

  requestMenu() {
    const menu = NavStore.getMenu(this.props.location);
    menu && (this.setState({menu: menu}));
  }

  render() {
    const {menu} = this.state;
    if (!menu)
      return null;

    const compName = 'nav';
    menu.base = globals.homeUrl;

    return (
      <nav className={css.block + compName}>
        <input type="checkbox" id={css.toggle + compName}/>
        <MenuToggle controls={css.toggle + compName}/>
        <Menu items={menu}/>
      </nav>
    );

  }
}
