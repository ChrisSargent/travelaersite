import React, {Component} from 'react';

import * as NavActions from './NavActions';
import NavStore from './NavStore';
import {Link} from 'react-router';

export default class Nav extends Component {

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
    if (this.state.menu) {
      const {menu} = this.state;

      const MenuItems = menu.map((item) => {
        if (item.object_id === 5) {
          item.object_slug = '/';
        }
        return (
          <li key={item.ID}>
            <Link to={item.object_slug}>{item.title}</Link>
          </li>
        );
      });

      return (
        <nav>
          <ul>
            {MenuItems}
          </ul>
        </nav>
      );

    } else {
      return null;
    }
  }
}
