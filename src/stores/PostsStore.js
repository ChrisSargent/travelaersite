import dispatcher from '../dispatcher';
import {EventEmitter} from 'events';

import * as PostsActions from '../actions/PostsActions';

class PostsStore extends EventEmitter {
  constructor() {
    super();
    this.posts = [];
    this.lookup = [];
    this.gotAllPosts = false;
    this.dispatchToken = dispatcher.register(this.handleActions.bind(this));
  }

  getPostsObj(slug) {
    var postsObj;

    slug
      ? postsObj = this.getPost(slug)
      : postsObj = this.getAllPosts();

    return postsObj;
  }

  getPost(slug) {
    // If looking for a single post, check the cache and return the post from the cache
    var postsObj;
    const index = this.lookup[slug];

    if (index !== undefined) {
      postsObj = this.configurePostObj(index);
      return postsObj;
    } else {
      PostsActions.fetchPosts();
      return false;
    }
  }

  getAllPosts() {
    var postsObj;
    if (this.gotAllPosts) {
      postsObj = this.configurePostObj();
      return postsObj;
    } else {
      PostsActions.fetchPosts();
      return false;
    }
  }

  updateLookup() {
    // Puts the posts in to an array, indexed by their slug
    for (var i = 0; i < this.posts.length; i++) {
      const post = this.posts[i];
      this.lookup[post.slug] = i;
    }
  }

  generateOthers(posts, postIndex) {
    var count,
      i,
      filteredPosts = [];
    count = 0;

    for (i = 0; i < posts.length; i++) {
      (i !== postIndex && count < 7) && (filteredPosts.push(posts[i]));
      count++
    }

    return filteredPosts;
  }

  configurePostObj(postIndex) {
    var postsObj;
    const {posts} = this;

    if (postIndex === undefined) {
      postsObj = {
        posts: posts.slice(0, 5),
        side: posts.slice(5),
        image: posts[0].t_featured_image,
        excerpts: true,
      }
    } else {
      postsObj = {
        posts: [posts[postIndex]],
        side: this.generateOthers(posts, postIndex),
        image: posts[postIndex].t_featured_image,
        excerpts: false,
      }
    }
    return postsObj;
  }

  handleActions(action) {
    switch (action.type) {
      case 'RECEIVE_POSTS':
        // console.log('PostsStore | handleActions | Receive Posts');
        var self = this;
        action.allPosts && (this.gotAllPosts = true);
        this.posts = action.posts;
        this.updateLookup();
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
