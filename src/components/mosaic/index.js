import React, {Component} from 'react';

// Stores & Actions
import * as MosaicActions from '../../actions/MosaicActions';
import MosaicStore from '../../stores/MosaicStore';
import MosaicTile from '../../components/mosaic__tile';

export default class Mosaic extends Component {
  constructor() {
    super();
    this.requestMosaic = this.requestMosaic.bind(this);
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
    // console.log('Mosaic | requestMosaic');
    this.setState({mosaic: MosaicStore.getMosaic()});
  }

  render() {
    const {mosaic} = this.state;
    const {acf_fc_layout} = this.props;

    const mosaicMap = mosaic.map((tile) => {
      return (
        <MosaicTile key={tile.id} {...tile} />
      );
    });

    return (
      <section className={acf_fc_layout}>
        <ul>
          {mosaicMap}
        </ul>
      </section>
    );
  }
}
