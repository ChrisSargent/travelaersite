import React from 'react';

import Banner from '../banner';
import Hero from '../hero';
import Mosaic from '../mosaic';
import Section from '../section';

function Blocks(props) {
  switch (props.acf_fc_layout) {
    case 'hero':
      return <Hero {...props}/>;

    case 'banner':
      return <Banner {...props}/>;

    case 'mosaic':
      return <Mosaic {...props}/>;

    case 'section':
      return <Section {...props}/>;

    default:
      return false;
  }
}

export default Blocks;
