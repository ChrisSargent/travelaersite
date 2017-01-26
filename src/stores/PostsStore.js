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

  updatePostComments(postID, comments) {
    const index = this.posts.findIndex(function(post) {
      return post.id === postID ? post : null;
    })
    this.posts[index].t_comments_info = comments;
  }

  handleActions(action) {
    switch (action.type) {
      case 'RECEIVE_POST':
        const {id, t_comments_info} = action.post;
        this.updatePostComments(id, t_comments_info);
        break;

      default:
    }
  }
}

const postsStore = new PostsStore();
export default postsStore;
