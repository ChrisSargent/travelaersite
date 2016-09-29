import React, {Component} from 'react';

import Hero from '../hero';
import Banner from '../banner';

export default class Sections extends Component {
  render() {

    const {props} = this;

    switch (props.acf_fc_layout) {
      case 'section--hero':
        return <Hero {...props}/>;

      case 'banner--logos':
        return <Banner type="logos" {...props}/>;

      default:
        return false;
    }
  }
}
