import dispatcher from '../dispatcher';
import {EventEmitter} from 'events';

class CommentsStore extends EventEmitter {
  constructor() {
    super();
    this.comments = [];
    this.resetForm = false;
    this.showLoader = false;
    this.dispatchToken = dispatcher.register(this.handleActions.bind(this));
  }

  getComments() {
    return this.comments;
  }

  getResetForm() {
    return this.resetForm;
  }

  getLoading() {
    return this.showLoader;
  }

  handleActions(action) {
    switch (action.type) {
      case 'ADDING_COMMENT':
        // console.log('CommentsStore | handleActions | Adding Comments');
        this.resetForm = false;
        this.showLoader = true;
        this.emit('change');
        break;

      case 'ADDED_COMMENT':
        // console.log('CommentsStore | handleActions | Added Comments');
        this.comments = action.comments;
        this.resetForm = true;
        this.showLoader = false;
        this.emit('change');
        break;

      case 'ERROR_COMMENT':
        console.log('Sorry, there was an error');
        this.resetForm = false;
        this.showLoader = false;
        this.emit('change');
        break;

      default:
    }
  }
}

const commentsStore = new CommentsStore();
export default commentsStore;
