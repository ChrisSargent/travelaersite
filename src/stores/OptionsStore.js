import dispatcher from '../dispatcher';
import {EventEmitter} from 'events';

class OptionsStore extends EventEmitter {
  constructor() {
    super();
    this.options = [];
    this.dispatchToken = dispatcher.register(this.handleActions.bind(this));
  }

  getOptions() {
    return this.options;
  }

  handleActions(action) {
    switch (action.type) {

      case 'RECEIVE_OPTIONS':
        this.options = action.options;
        this.emit('change');
        break;

      default:
    }
  }
}

const optionsStore = new OptionsStore();
export default optionsStore;
