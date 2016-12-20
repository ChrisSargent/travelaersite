import dispatcher from '../dispatcher';
import {EventEmitter} from 'events';

class SubmitStore extends EventEmitter {
  constructor() {
    super();
    this.resetForm = false;
    this.showLoader = false;
    this.messageObj = {};
    this.dispatchToken = dispatcher.register(this.handleActions.bind(this));
  }

  shouldResetForm() {
    return this.resetForm;
  }

  getLoading() {
    return this.showLoader;
  }

  getMessageObj() {
    return this.messageObj;
  }

  setApprovedMessage() {
    this.messageObj = {
      message: 'Thanks! Your comment has been approved and added.',
      messageType: 'success',
    };
  };

  setPendingMessage() {
    this.messageObj = {
      message: 'Thanks! Your comment has been submitted and is awaiting approval.',
      messageType: 'success',
    };
  };

  setErrorMessage(action) {
    this.messageObj = {
      message: 'Sorry, there was a problem with your comment and it was not submitted. The error was: ',
      messageType: 'error',
      error: action.message,
    }
  }

  handleActions(action) {
    switch (action.type) {
      case 'ADDING_COMMENT':
        // console.log('SubmitStore | handleActions | Adding Comment');
        this.resetForm = false;
        this.showLoader = true;
        this.setApprovedMessage();
        this.emit('change');
        break;

      case 'APPROVED_COMMENT':
        // console.log('SubmitStore | handleActions | Approved Comment');
        this.resetForm = true;
        this.showLoader = false;
        this.setPendingMessage();
        this.emit('change');
        break;

      case 'PENDING_COMMENT':
        // console.log('SubmitStore | handleActions | Pending Comment');
        this.resetForm = true;
        this.showLoader = false;
        this.emit('change');
        break;

      case 'ERROR_COMMENT':
        this.resetForm = false;
        this.showLoader = false;
        this.setErrorMessage(action);
        this.emit('change');
        break;

      default:
    }
  }
}

const submitStore = new SubmitStore();
export default submitStore;
