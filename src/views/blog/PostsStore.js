import { EventEmitter } from "events";

import dispatcher from "../dispatcher";

class PostsStore extends EventEmitter {
  constructor() {
    super()
    this.data = {
      posts: [],
      fetchingPosts: true
    };
  }

  getPostsData() {
    console.log('getPostsData', this.data);
    return this.data;
  }

  handleActions(action) {
    switch(action.type) {
      case "FETCH_POSTS": {
        console.log("Fetch Posts");
        this.data.fetchingPosts = true;
        this.emit("change");
        break;
      }
      case "RECEIVE_POSTS": {
        console.log("Receive Posts");
        this.data.posts = action.posts;
        this.data.fetchingPosts = false;
        this.emit("change");
        break;
      }
      default: {
        break;
      }
    }
  }

}

const postsStore = new PostsStore();
dispatcher.register(postsStore.handleActions.bind(postsStore));

export default postsStore;
