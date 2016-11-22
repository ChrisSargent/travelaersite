import dispatcher from '../dispatcher';
import {EventEmitter} from 'events';

import * as PostsActions from '../actions/PostsActions';

class PostsStore extends EventEmitter {
  constructor() {
    super();
    this.posts = [];
    this.cache = [];
    this.fetchingPosts = false;
    this.dispatchToken = dispatcher.register(this.handleActions.bind(this));
  }

  getPosts(slug) {
    console.log('PostsStore | getPosts');

    if (slug) {
      // If looking for a single post, check the cache.
      if (this.cache[slug]) {
        // Return the post from the cache if it exists
        return this.cache[slug];
      } else {
        // Else do an ajax call for it
        PostsActions.fetchPosts(slug);
      }
    } else {
      // If looking for all posts, run the full ajax call
      return this.posts;
    }
  }

  getLoading() {
    return this.fetchingPosts;
  }

  updateCache() {
    for (var i = 0; i < this.posts.length; i++) {
      var post = this.posts[i];
      if (!this.cache[post.slug]) {
        this.cache[post.slug] = post;
        console.log('Added post to cache');
      }
    }
    console.log(this.cache);
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
        this.updateCache();
        this.fetchingPosts = false;
        break;

      default:
    }
    this.emit('change');
  }

}

const postsStore = new PostsStore();

export default postsStore;
