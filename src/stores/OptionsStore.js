import dispatcher from '../dispatcher';
import {EventEmitter} from 'events';

class OptionsStore extends EventEmitter {
  constructor() {
    super();
    this.options = [];
    this.fetchingOptions = false;
    this.dispatchToken = dispatcher.register(this.handleActions.bind(this));
  }

  getOptions() {
    // console.log('OptionsStore | getOptions');
    return this.options;
  }

  getOptionsLoading() {
    return this.fetchingOptions;
  }

  handleActions(action) {
    switch (action.type) {
      case 'FETCH_OPTIONS':
        // console.log('OptionsStore | handleActions | Fetch Options');
        this.fetchingOptions = true;
        break;

      case 'RECEIVE_OPTIONS':
        // console.log('OptionsStore | handleActions | Receive Options');
        this.options = action.options;
        this.fetchingOptions = false;
        break;

      default:
        return true;
    }
    this.emit('change');
    return true;
  }
}

const optionsStore = new OptionsStore();

export default optionsStore;
