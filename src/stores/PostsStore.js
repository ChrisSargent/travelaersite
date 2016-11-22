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

  getLoading() {
    // console.log('Posts: getLoading');
    return this.fetchingPosts;
  }

  handleActions(action) {
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
    }
    this.emit('change');
  }

}

const postsStore = new PostsStore();

export default postsStore;
