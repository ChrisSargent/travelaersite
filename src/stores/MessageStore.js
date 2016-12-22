import dispatcher from '../dispatcher';
import {EventEmitter} from 'events';

class MessageStore extends EventEmitter {
  constructor() {
    super();
    this.messageObj = {};
    this.dispatchToken = dispatcher.register(this.handleActions.bind(this));
  }

  getMessageObj() {
    return this.messageObj;
  }

  handleActions(action) {
    switch (action.type) {
      case 'APPROVED_COMMENT':
        // console.log('MessageStore | handleActions | Approved Comment');
        this.messageObj = {
          message: 'Thanks! Your comment has been approved and added.',
          messageType: 'success',
        };
        this.emit('change');
        break;

      case 'PENDING_COMMENT':
        // console.log('MessageStore | handleActions | Pending Comment');
        this.messageObj = {
          message: 'Thanks! Your comment has been submitted and is awaiting approval.',
          messageType: 'success',
        };
        this.emit('change');
        break;

      case 'ERROR_COMMENT':
        // console.log('MessageStore | handleActions | Error Comment');
        this.messageObj = {
          message: 'Sorry, there was a problem with your comment and it was not submitted. The error was: ',
          messageType: 'error',
          error: action.message,
        }
        this.emit('change');
        break;

      case 'RESET_MESSAGE':
        this.messageObj = false;
        this.emit('change');
        break;

      default:
    }
  }
}

const submitStore = new MessageStore();
export default submitStore;
