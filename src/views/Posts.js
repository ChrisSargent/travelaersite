import React from "react";

import Loader from "../components/loader/";
import Post from "../components/Post";
import * as PostsActions from "../actions/PostsActions";
import PostsStore from "../stores/PostsStore";

export default class Posts extends React.Component {
  constructor() {
    super();
    this.getPosts = this.getPosts.bind(this); // This just ensures we're always binding properly to this.getPosts
    this.state = {
      data: PostsStore.getPostsData()
    };
  }

  componentWillMount() {
    console.log("componentWillMount");
    // Instruct the actions to fetch the posts
    PostsActions.fetchPosts();

    // When the posts store has received the new info, it will trigger this change event handler
    PostsStore.on("change", this.getPosts);
  }

  componentWillUnmount() {
    PostsStore.removeListener("change", this.getPosts);
  }

  getPosts() {
    // This is called when there is a change to the store and requests the new information from the store.
    console.log('Store Changed - getPosts');
    this.setState({data: PostsStore.getPostsData()});
    console.log('State:', this.state);
  }

  reloadPosts() {
    // This is not really needed
    console.log("reloadPosts");
    PostsActions.fetchPosts();
  }

  render() {
    const {posts, fetchingPosts} = this.state.data;

    const PostComponents = posts.map((post) => {
      return <Post key={post.id} {...post}/>;
    });

    if (fetchingPosts) {
      return (
        <Loader />
      )
    } else {
      return (
        <div>
          <button onClick={this.reloadPosts.bind(this)}>Reload!</button>
          <header>Posts</header>
          {PostComponents}
        </div>
      );

    }
  }
}
