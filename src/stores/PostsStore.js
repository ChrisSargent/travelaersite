import dispatcher from '../dispatcher';
import {EventEmitter} from 'events';

class PostsStore extends EventEmitter {
  constructor() {
    super();
    this.posts = [];
    this.fetchingPosts = false;
    this.dispatchToken = dispatcher.register(this.handleActions.bind(this));
  }

  getPosts() {
    // console.log('PostsStore | getPosts');
    return this.posts;
  }

  getPostsLoading() {
    return this.fetchingPosts;
  }

  handleActions(action) {
    var self = this; // To use in the timeout
    switch (action.type) {
      case 'FETCH_POSTS':
        // console.log('PostsStore | handleActions | Fetch Posts');
        this.fetchingPosts = true;
        break;

      case 'RECEIVE_POSTS':
        // console.log('PostsStore | handleActions | Receive Posts');
        this.posts = action.posts;
        this.fetchingPosts = false;
        break;

      default:
        return true;
    }
    // TODO: Find a way to take this out of the timeout
    // Needs to be in a setTimeout to prevent error: Invariant Violation: Dispatch.dispatch(...): Cannot dispatch in the middle of a dispatch.
    // Tried for several hours using dispatcher.waitFor but no dice
    setTimeout(function() {
      self.emit('change');
    });
    return true;
  }

}

const postsStore = new PostsStore();

export default postsStore;
