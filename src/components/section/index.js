import React from 'react';

import Banner from '../banner';
import Hero from '../hero';
import Mosaic from '../mosaic';

function Sections(props) {
  switch (props.acf_fc_layout) {
    case 'section--hero':
      return <Hero {...props}/>;

    case 'banner--logos':
      return <Banner {...props}/>;

    case 'mosaic':
      return <Mosaic {...props}/>;

    default:
      return false;
  }
}

export default Sections;
