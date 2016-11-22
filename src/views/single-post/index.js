import React, {Component} from 'react';

// Stores & Actions
import * as PostsActions from '../../actions/PostsActions';
import PostsStore from '../../stores/PostsStore';

// Components
import Hero from '../../components/hero';
import Post from '../../components/post';

require('./_single-post.sass')

export default class SinglePost extends Component {
  constructor() {
    super();
    this.requestPosts = this.requestPosts.bind(this);
    this.state = {
      post: PostsStore.getPosts()
    };
  }

  componentWillMount() {
    PostsActions.fetchPosts(this.props.params.slug);
    PostsStore.on('change', this.requestPosts);
  }

  componentWillReceiveProps(props) {
    // If the requested slug doesn't match the current slug, fetch the new post to trigger a new requestPosts being fired by the call backs
    if (this.props.params.slug !== props.params.slug) {
      PostsActions.fetchPosts(props.params.slug);
    }
  }

  componentWillUnmount() {
    PostsStore.removeListener('change', this.requestPosts);
  }

  requestPosts() {
    this.setState({post: PostsStore.getPosts()});
  }

  render() {
    if (this.state.post.length === 0) {
      // If we haven't got the post from the API yet, return as fast as possible
      return false;
    }

    const post = this.state.post[0];

    return (
      <main id={post.slug} className={post.slug}>
        <Hero />
        <section className="post-section">
          <Post post={post} />
          <aside className="side-bar">Test</aside>
        </section>
      </main>
    );
  }
}
