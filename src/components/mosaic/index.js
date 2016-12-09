import React, {Component} from 'react';
import css from '../../lib/css';

// Stores & Actions
import MosaicStore from '../../stores/MosaicStore';
import Tile from '../tile';

require('./_mosaic.sass');

export default class Mosaic extends Component {
  constructor() {
    super();
    this.requestMosaic = this.requestMosaic.bind(this);
    this.state = {};
  }

  componentWillMount() {
    this.requestMosaic();
    MosaicStore.on('change', this.requestMosaic);
  }

  componentWillUnmount() {
    MosaicStore.removeListener('change', this.requestMosaic);
  }

  requestMosaic() {
    const mosaic = MosaicStore.getMosaic();
    mosaic && (this.setState({mosaic: mosaic}));
  }

  render() {
    const {mosaic} = this.state;
    if (!mosaic)
      return null;

    const compName = 'mosaic';

    const mosaicMap = mosaic.map((tile) => {
      return (<Tile key={tile.id} {...tile}/>);
    });

    return (
      <section className={css.section + compName}>
        <ul className={css.list + compName}>
          {mosaicMap}
        </ul>
      </section>
    );
  }
}
