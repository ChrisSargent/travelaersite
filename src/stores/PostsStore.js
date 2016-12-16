import dispatcher from '../dispatcher';
import {EventEmitter} from 'events';

import * as PostsActions from '../actions/PostsActions';

class PostsStore extends EventEmitter {
  constructor() {
    super();
    this.posts = [];
    this.cache = [];
    this.gotAllPosts = false;
    this.dispatchToken = dispatcher.register(this.handleActions.bind(this));
  }

  getPosts() {
    if (this.gotAllPosts) {
      return this.posts;
    } else {
      PostsActions.fetchPosts();
      return false;
    }
  }

  // getPost(slug) {
  //   // If looking for a single post, check the cache and return the post from the cache
  //   if (this.cache[slug]) {
  //     return this.cache[slug];
  //   } else {
  //     PostsActions.fetchPosts();
  //     return false;
  //   }
  // }

  updateCache() {
    // Puts the posts in to an array, indexed by their slug
    for (var i = 0; i < this.posts.length; i++) {
      var post = this.posts[i];
      if (!this.cache[post.slug]) {
        this.cache[post.slug] = post;
      }
    }
  }

  handleActions(action) {
    switch (action.type) {
      case 'RECEIVE_POSTS':
        // console.log('PostsStore | handleActions | Receive Posts');
        var self = this;
        action.allPosts && (this.gotAllPosts = true);
        this.posts = action.posts;
        this.updateCache();
        // TODO: Find a way to take this out of the timeout
        // Needs to be in a setTimeout to prevent error: Invariant Violation: Dispatch.dispatch(...): Cannot dispatch in the middle of a dispatch.
        // Tried for several hours using dispatcher.waitFor but no dice
        setTimeout(function() {
          self.emit('change');
        });
        break;

      default:
    }

  }

}

const postsStore = new PostsStore();
export default postsStore;
