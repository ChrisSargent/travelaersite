import React, {Component} from 'react';
import css from '../../lib/css';

// Stores & Actions
import * as MosaicActions from '../../actions/MosaicActions';
import MosaicStore from '../../stores/MosaicStore';
import Tile from '../tile';

require('./_mosaic.sass');

export default class Mosaic extends Component {
  constructor() {
    super();
    this.requestMosaic = this.requestMosaic.bind(this);
    this.shuffle = this.shuffle.bind(this);
    this.state = {
      mosaic: MosaicStore.getMosaic()
    };
  }

  componentWillMount() {
    MosaicActions.fetchMosaic();
    MosaicStore.on('change', this.requestMosaic);
  }

  componentWillUnmount() {
    MosaicStore.removeListener('change', this.requestMosaic);
  }

  requestMosaic() {
    const mosaic = MosaicStore.getMosaic();
    this.setState({mosaic: this.shuffle(mosaic)});
  }

  shuffle(array) {
    var currentIndex = array.length,
      temporaryValue,
      randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  render() {
    const {mosaic} = this.state;
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
