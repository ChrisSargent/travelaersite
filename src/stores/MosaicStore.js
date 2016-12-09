import dispatcher from '../dispatcher';
import {EventEmitter} from 'events';

import * as MosaicActions from '../actions/MosaicActions';

class MosaicStore extends EventEmitter {
  constructor() {
    super();
    this.mosaic = [];
    this.mosaicCache = [];
    this.dispatchToken = dispatcher.register(this.handleActions.bind(this));
  }

  getMosaic() {
    if (this.mosaicCache.length > 0) {
      return this.mosaicCache;
    } else {
      MosaicActions.fetchMosaic();
      return false;
    }
  }

  updateCache() {
    this.mosaicCache = this.mosaic;
  }

  handleActions(action) {
    switch (action.type) {
      case 'FETCH_MOSAIC':
        // console.log('MosaicStore | handleActions | Fetch Mosaic');
        // this.emit('change');
        break;

      case 'RECEIVE_MOSAIC':
        // console.log('MosaicStore | handleActions | Receive Mosaic');
        this.mosaic = action.mosaic;
        this.updateCache();
        this.emit('change');
        break;

      default:
    }
  }
}

const mosaicStore = new MosaicStore();
export default mosaicStore;
