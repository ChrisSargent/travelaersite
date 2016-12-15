import React, {Component} from 'react';
import css from '../../lib/css'
import Insta from '../../components/insta';
import Post from '../../components/post';
import PostsStore from '../../stores/PostsStore';
import RecentPosts from '../../components/recent-posts';
import RespImageCover from '../../components/resp-image-cover';
import Section from '../../components/section';

require('./_single-post.sass')

export default class SinglePost extends Component {
  constructor(props) {
    super(props);
    this.requestPost = this.requestPost.bind(this);
    this.state = {};
  }

  componentWillMount() {
    this.requestPost();
    PostsStore.on('change', this.requestPost);
  }

  componentWillUnmount() {
    PostsStore.removeListener('change', this.requestPost);
  }

  componentWillReceiveProps(newProps) {
    if (this.props.params.slug !== newProps.params.slug) {
      const post = PostsStore.getPost(newProps.params.slug);
      post && (this.setState({post: post}));
    }
  }

  componentDidUpdate() {
    window.twttr.widgets.load();
  }

  requestPost() {
    const post = PostsStore.getPost(this.props.params.slug);
    post && (this.setState({post: post}));
  }

  render() {
    const post = this.state.post;
    if (!post)
      return false;

    const compName = 'singlepost';

    return (
      <main id={post.slug} className={post.slug}>
        <section className={css.section + 'hero'}>
          <RespImageCover image={post.t_featured_image}/>
        </section>
        <Section compName={compName}>
          <Post post={post}/>
          <aside className={css.sidebar + compName}>
            <RecentPosts currPost={post.id}/>
            <Insta/>
          </aside>
        </Section>
      </main>
    );
  }
}
