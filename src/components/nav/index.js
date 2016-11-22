import React, {Component} from 'react';
import globals from '../../lib/globals'

import * as NavActions from '../../actions/NavActions';
import NavStore from '../../stores/NavStore';
import {IndexLink, Link} from 'react-router';

require('./_nav.sass');

function MenuItem(props) {
  const {item} = props;
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

  linkClass = "nav-link";
  if (item.children.length > 0) {
    item.children.base = item.link + '/';
    linkClass += " -hassub";
  }

  return (
    <li className="item">
      {item.index
        ? <IndexLink to={item.link} className={linkClass} activeClassName="-active">{item.title}</IndexLink>
        : <Link to={item.link} className={linkClass} activeClassName="-active">{item.title}</Link>
      }
      {item.children.length > 0 && <Menu items={item.children}/>}
    </li>
  );
}

function Menu(props) {
  const {items} = props;
  var primaryNav;

  if (items) {
    items.base === globals.homeUrl
      ? primaryNav = true
      : primaryNav = false;

    const itemsMap = items.map((item) => {
      item.base = items.base;
      return (<MenuItem key={item.ID} item={item}/>);
    });

    if (primaryNav) {
      return (
        <ul className="nav-list">{itemsMap}</ul>
      );
    } else {
      return (
        <div className="subnav-wrap">
          <div className="container">
            <ul className="subnav-list">{itemsMap}</ul>
          </div>
        </div>
      );
    }
  } else {
    return null;
  }
}

export default class NavBlock extends Component {

  constructor() {
    super();
    this.requestMenu = this.requestMenu.bind(this); // This just ensures we're always binding properly to this.requestMenu
    this.state = {
      menu: NavStore.getMenu()
    };
  }

  componentWillMount() {
    const {location} = this.props;
    NavActions.fetchMenu(location);
    NavStore.on('change', this.requestMenu);
  }

  componentWillUnmount() {
    NavStore.removeListener('change', this.requestMenu);
  }

  requestMenu() {
    this.setState({menu: NavStore.getMenu()});
  }

  render() {
    if (this.state.menu.length > 0) {
      const {menu} = this.state;
      menu.base = globals.homeUrl;

      return (
        <nav className="nav-block">
          <Menu items={menu}/>
        </nav>
      );

    } else {
      return null;
    }
  }
}
