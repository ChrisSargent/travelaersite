import React, {Component} from 'react';
import globals from '../../lib/globals'

import * as NavActions from '../../actions/NavActions';
import NavStore from '../../stores/NavStore';
import {Link} from 'react-router';

require('./_nav.sass');

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
    if (this.state.menu) {
      const {menu} = this.state;

      const menuMap = menu.map((item) => {
        if (item.object_id === 5) {
          item.object_slug = '';
        }
        const link = globals.homeUrl + item.object_slug;
        return (
          <li key={item.ID} className="item">
            <Link to={link} className="navlink" activeClassName="-active">{item.title}</Link>
          </li>
        );
      });

      return (
        <nav>
          <ul className="nav-list">
            {menuMap}
          </ul>
        </nav>
      );

    } else {
      return null;
    }
  }
}
