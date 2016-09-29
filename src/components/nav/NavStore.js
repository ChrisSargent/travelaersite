import dispatcher from '../../dispatcher';
import {EventEmitter} from 'events';

class NavStore extends EventEmitter {
  constructor() {
    super();
    this.menu = [];
    this.fetchingMenu = true;
  }

  getMenu() {
    // console.log('NavStore | getMenu');
    return this.menu;
  }

  getMenuLoading() {
    return this.fetchingMenu;
  }

  handleActions(action) {
    switch (action.type) {
      case 'FETCH_MENU':
        {
          // console.log('NavStore | handleActions | Fetch Menu');
          this.fetchingMenu = true;
          this.emit('change');
          break;
        }
      case 'RECEIVE_MENU':
        {
          // console.log('NavStore | handleActions | Receive Menu');
          this.menu = action.menu;
          this.fetchingMenu = false;
          this.emit('change');
          break;
        }
      default:
        {
          break;
        }
    }
  }
}

const navStore = new NavStore();
dispatcher.register(navStore.handleActions.bind(navStore));

export default navStore;
