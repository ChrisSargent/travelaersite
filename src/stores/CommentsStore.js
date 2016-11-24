import dispatcher from '../dispatcher';
import {EventEmitter} from 'events';

class CommentsStore extends EventEmitter {
  constructor() {
    super();
    this.comments = [];
    this.fetchingComments = false;
    this.resetForm = false;
    this.dispatchToken = dispatcher.register(this.handleActions.bind(this));
  }

  getComments() {
    return this.comments;
  }

  getLoading() {
    return this.fetchingComments;
  }

  getResetForm() {
    return this.resetForm;
  }

  handleActions(action) {
    switch (action.type) {
      case 'ADDING_COMMENT':
        // console.log('CommentsStore | handleActions | Adding Comments');
        this.fetchingComments = true;
        this.resetForm = false;
        this.emit('change');
        break;

      case 'ADDED_COMMENT':
        // console.log('CommentsStore | handleActions | Added Comments');
        this.comments = action.comments;
        this.fetchingComments = false;
        this.resetForm = true;
        this.emit('change');
        break;

      case 'ERROR_COMMENT':
        console.log('Sorry, there was an error');
        this.fetchingComments = false;
        this.resetForm = false;
        this.emit('change');
      break;

      default:
    }
  }
}

CommentsStore.dispatchToken = null;

const commentsStore = new CommentsStore();

export default commentsStore;