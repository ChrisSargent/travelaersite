import dispatcher from '../dispatcher';
import {EventEmitter} from 'events';

class MosaicStore extends EventEmitter {
  constructor() {
    super();
    this.mosaic = [];
    this.fetchingMosaic = false;
    this.dispatchToken = dispatcher.register(this.handleActions.bind(this));
  }

  getMosaic() {
    // console.log('MosaicStore | getMosaic');
    return this.mosaic;
  }

  getLoading() {
    return this.fetchingMosaic;
  }

  handleActions(action) {
    switch (action.type) {
      case 'FETCH_MOSAIC':
        // console.log('MosaicStore | handleActions | Fetch Mosaic');
        this.fetchingMosaic = true;
        this.emit('change');
        break;

      case 'RECEIVE_MOSAIC':
        // console.log('MosaicStore | handleActions | Receive Mosaic');
        this.mosaic = action.mosaic;
        this.fetchingMosaic = false;
        this.emit('change');
        break;

      default:
    }
  }
}

const mosaicStore = new MosaicStore();
export default mosaicStore;
