import dispatcher from '../dispatcher';
import {EventEmitter} from 'events';

import * as SiteActions from '../actions/SiteActions';

class NavStore extends EventEmitter {
  constructor() {
    super();
    this.menu = [];
    this.menuCache = [];
    this.dispatchToken = dispatcher.register(this.handleActions.bind(this));
  }

  getMenu(location) {
    if (this.menuCache[location]) {
      return this.menuCache[location];
    } else {
      SiteActions.fetchMenu(location);
      return false;
    }
  }

  updateCache(location) {
    this.menuCache[location] = this.menu;
  }

  handleActions(action) {
    switch (action.type) {
      case 'FETCH_MENU':
        // console.log('NavStore | handleActions | Fetch Menu');
        // this.emit('change');
        break;

      case 'RECEIVE_MENU':
        // console.log('NavStore | handleActions | Receive Menu');
        this.menu = action.menu;
        this.updateCache(action.location);
        this.emit('change');
        break;

      default:
    }
  }
}

const navStore = new NavStore();
export default navStore;
