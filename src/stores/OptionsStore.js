import dispatcher from '../dispatcher';
import {EventEmitter} from 'events';

class OptionsStore extends EventEmitter {
  constructor() {
    super();
    this.options = [];
    this.fetchingOptions = true;
    this.dispatchToken = dispatcher.register(this.handleActions.bind(this));
  }

  getOptions() {
    // console.log('OptionsStore | getOptions');
    return this.options;
  }

  handleActions(action) {
    switch (action.type) {
      case 'FETCH_OPTIONS':
        // console.log('OptionsStore | handleActions | Fetch Options');
        // this.emit('change');
        break;

      case 'RECEIVE_OPTIONS':
        // console.log('OptionsStore | handleActions | Receive Options');
        this.options = action.options;
        this.emit('change');
        break;

      default:
    }
  }
}

const optionsStore = new OptionsStore();
export default optionsStore;
