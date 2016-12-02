import React, {Component} from 'react';
import css from '../../lib/css'

// Stores & Actions
import PostsStore from '../../stores/PostsStore';

// Components
import Hero from '../../components/hero';
import Post from '../../components/post';
import RecentPosts from '../../components/recent-posts';

require('./_single-post.sass')

export default class SinglePost extends Component {
  constructor(props) {
    super(props);
    this.requestPost = this.requestPost.bind(this);
    this.state = {};
  }

  componentWillMount() {
    this.setState({
      post: PostsStore.getPost(this.props.params.slug)
    });
    PostsStore.on('change', this.requestPost);
  }

  componentWillUnmount() {
    PostsStore.removeListener('change', this.requestPost);
  }

  componentWillReceiveProps(props) {
    if (this.props.params.slug !== props.params.slug) {
      this.setState({
        post: PostsStore.getPost(props.params.slug)
      });
    }
  }

  requestPost(slug) {
    this.setState({
      post: PostsStore.getPost(this.props.params.slug)
    });
  }

  render() {
    if (!this.state.post)
      // If we haven't got the post from the API yet, return as fast as possible
      return false;

    const compName = 'singlepost';
    const post = this.state.post;

    return (
      <main id={post.slug} className={post.slug}>
        <Hero image={post.t_featured_image.url}/>
        <section className={css.section + compName}>
          <Post post={post}/>
          <aside className={css.sidebar + compName}>
            <RecentPosts currPost={post.id}/>
          </aside>
        </section>
      </main>
    );
  }
}
