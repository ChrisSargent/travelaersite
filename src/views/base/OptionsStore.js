import dispatcher from '../../dispatcher';
import {EventEmitter} from 'events';

class OptionsStore extends EventEmitter {
  constructor() {
    super();
    this.options = [];
    this.fetchingOptions = true;
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
        {
          // console.log('OptionsStore | handleActions | Fetch Options');
          this.fetchingOptions = true;
          this.emit('change');
          break;
        }
      case 'RECEIVE_OPTIONS':
        {
          // console.log('OptionsStore | handleActions | Receive Options');
          this.options = action.options;
          this.fetchingOptions = false;
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

const optionsStore = new OptionsStore();
dispatcher.register(optionsStore.handleActions.bind(optionsStore));

export default optionsStore;
