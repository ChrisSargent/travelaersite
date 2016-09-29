import React, {Component} from 'react';
import Logo from '../logo';
import Nav from '../nav';

export default class Header extends Component {

  render() {
    return (
      <header>
        <Logo/>
        <Nav location="primary"/>
      </header>
    );
  }
}
