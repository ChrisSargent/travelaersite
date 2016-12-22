import dispatcher from '../dispatcher';
import {EventEmitter} from 'events';

class SubmitStore extends EventEmitter {
  constructor() {
    super();
    this.cachedState = {
      showLoader: false,
      name: '',
      email: '',
      comment: '',
    };
    this.submitted = false;
    this.dispatchToken = dispatcher.register(this.handleActions.bind(this));
  }

  getCachedState() {
    return this.cachedState;
  }

  getSubmitted() {
    return this.submitted;
  }

  handleActions(action) {
    switch (action.type) {
      case 'ADDING_COMMENT':
        // console.log('SubmitStore | handleActions | Adding Comment', this);
        this.cachedState.showLoader = true;
        this.submitted = false;
        this.emit('change');
        break;

      case 'PENDING_COMMENT':
      case 'APPROVED_COMMENT':
        // console.log('SubmitStore | handleActions | Approved / Pending Comment', this);
        this.cachedState.showLoader = false;
        this.cachedState.comment = '';
        this.submitted = true;
        this.emit('change');
        break;

      case 'ERROR_COMMENT':
        // console.log('MessageStore | handleActions | Error Comment', this);
        this.cachedState.showLoader = false;
        this.emit('change');
        break;

      case 'STORE_INPUTS':
        this.cachedState = action.cachedState;
        break;

      default:
    }
  }
}

const submitStore = new SubmitStore();
export default submitStore;
