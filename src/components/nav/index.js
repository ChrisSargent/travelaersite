import React, {Component} from 'react';
import globals from '../../lib/globals'

import * as NavActions from '../../actions/NavActions';
import NavStore from '../../stores/NavStore';
import {IndexLink, Link} from 'react-router';

require('./_nav.sass');

function MenuItem(props) {
  const {item} = props;

  // Is this the home page link?
  switch (item.object_id) {
    case 5:
      item.link = item.base;
      item.index = true;
      break;

    default:
      item.link = item.base + item.object_slug;
  }

  item.children.length > 0 && (item.children.base = item.link + '/');

  return (
    <li className="item">
      { item.index ?
        <IndexLink to={item.link} className="navlink" activeClassName="-active">{item.title}</IndexLink> :
        <Link to={item.link} className="navlink" activeClassName="-active">{item.title}</Link>
      }
      { item.children.length > 0 && <Menu items={item.children} /> }
    </li>
  );
}

function Menu(props) {
  const {items} = props;
  var listClass;

  if(items) {
    items.base === globals.homeUrl ? listClass = 'nav-list' : listClass = 'subnav-list';

    const itemsMap = items.map((item) => {
      item.base = items.base;
      return (<MenuItem key={item.ID} item={item} />);
    });

    return (
      <ul className={listClass}>
        {itemsMap}
      </ul>
    );
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
    // console.log('Nav | requestMenu');
    this.setState({menu: NavStore.getMenu()});
  }

  render() {
    if (this.state.menu.length > 0) {
      const {menu} = this.state;
      menu.base = globals.homeUrl;

      return (
        <nav>
          <Menu items={menu} />
        </nav>
      );

    } else {
      return null;
    }
  }
}
