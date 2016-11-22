import React, {Component} from 'react';

// Stores & Actions
import PostsStore from '../../stores/PostsStore';

// Components
import Hero from '../../components/hero';
import Post from '../../components/post';

require('./_single-post.sass')

export default class SinglePost extends Component {
  constructor(props) {
    super(props);
    this.requestPost = this.requestPost.bind(this);
    this.state = {};
  }

  componentWillMount() {
    this.setState({
      post: PostsStore.getPosts(this.props.params.slug)
    });
    PostsStore.on('change', this.requestPost);
  }

  componentWillUnmount() {
    PostsStore.removeListener('change', this.requestPost);
  }

  requestPost() {
    this.setState({
      post: PostsStore.getPosts(this.props.params.slug)
    });
  }

  render() {
    if (!this.state.post) {
      // If we haven't got the post from the API yet, return as fast as possible
      return false;
    }

    const post = this.state.post;

    return (
      <main id={post.slug} className={post.slug}>
        <Hero/>
        <section className="post-section">
          <Post post={post}/>
          <aside className="side-bar">Test</aside>
        </section>
      </main>
    );
  }
}
