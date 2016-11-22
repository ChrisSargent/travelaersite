import dispatcher from '../dispatcher';
import {EventEmitter} from 'events';

import * as PostsActions from '../actions/PostsActions';

class PostsStore extends EventEmitter {
  constructor() {
    super();
    this.posts = [];
    this.cache = [];
    this.gotAllPosts = false;
    this.fetchingPosts = false;
    this.dispatchToken = dispatcher.register(this.handleActions.bind(this));
  }

  getPosts(slug) {
    switch (slug) {
      case 'all':
        // If we've already got all the posts just return them
        if (this.gotAllPosts) {
          return this.posts;
        }
        break;

      default:
        // If looking for a single post, check the cache and return the post from the cache
        if (this.cache[slug]) {
          return this.cache[slug];
        }
        break;
    }
    // Else do an ajax call for the post / posts
    PostsActions.fetchPosts(slug);
  }

  getLoading() {
    return this.fetchingPosts;
  }

  updateCache() {
    for (var i = 0; i < this.posts.length; i++) {
      var post = this.posts[i];
      if (!this.cache[post.slug]) {
        this.cache[post.slug] = post;
      }
    }
  }

  handleActions(action) {
    switch (action.type) {
      case 'FETCH_POSTS':
        // console.log('PostsStore | handleActions | Fetch Posts');
        this.fetchingPosts = true;
        this.emit('change');
        break;

      case 'RECEIVE_POSTS':
        // console.log('PostsStore | handleActions | Receive Posts');
        action.slug === 'all' && (this.gotAllPosts = true);
        this.posts = action.posts;
        this.updateCache();
        this.fetchingPosts = false;
        this.emit('change');
        break;

      default:
    }

  }

}

const postsStore = new PostsStore();

export default postsStore;
