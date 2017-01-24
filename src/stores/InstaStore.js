import dispatcher from '../dispatcher';
import {EventEmitter} from 'events';

import * as InstaActions from '../actions/InstaActions';

class InstaStore extends EventEmitter {
  constructor() {
    super();
    this.insta = [];
    this.instaCache = false;
    this.dispatchToken = dispatcher.register(this.handleActions.bind(this));
  }

  getInsta(user) {
    if (this.instaCache) {
      return this.instaCache;
    } else {
      InstaActions.fetchInsta(user);
      return false;
    }
  }

  updateCache() {
    this.instaCache = this.insta;
  }

  handleActions(action) {
    switch (action.type) {
      case 'FETCH_INSTA':
        // console.log('InstaStore | handleActions | Fetch Insta');
        // this.emit('change');
        break;

      case 'RECEIVE_INSTA':
        // console.log('InstaStore | handleActions | Receive Insta');
        this.insta = action.insta;
        this.updateCache();
        this.emit('change');
        break;

      default:
    }
  }
}

const instaStore = new InstaStore();
export default instaStore;
