import dispatcher from '../dispatcher';
import {EventEmitter} from 'events';

class NavStore extends EventEmitter {
  constructor() {
    super();
    this.menu = [];
    this.fetchingMenu = false;
    this.dispatchToken = dispatcher.register(this.handleActions.bind(this));
  }

  getMenu() {
    // console.log('NavStore | getMenu');
    return this.menu;
  }

  getLoading() {
    return this.fetchingMenu;
  }

  handleActions(action) {
    switch (action.type) {
      case 'FETCH_MENU':
        // console.log('NavStore | handleActions | Fetch Menu');
        this.fetchingMenu = true;
        this.emit('change');
        break;

      case 'RECEIVE_MENU':
        // console.log('NavStore | handleActions | Receive Menu');
        this.menu = action.menu;
        this.fetchingMenu = false;
        this.emit('change');
        break;

      default:
    }
  }
}

const navStore = new NavStore();

export default navStore;
