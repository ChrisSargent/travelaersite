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
    // this.requestPost = this.requestPost.bind(this);
    this.requestPosts = this.requestPosts.bind(this);
    this.state = {};
  }

  componentWillMount() {
    this.requestPosts();
    PostsStore.on('change', this.requestPosts);
  }

  componentWillUnmount() {
    PostsStore.removeListener('change', this.requestPosts);
  }

  componentWillReceiveProps(newProps) {
    if (this.props.params.slug !== newProps.params.slug) {
      const post = PostsStore.getPost(newProps.params.slug);
      post && (this.setState({post: post}));
    }
  }

  componentDidUpdate() {
    // window.twttr.widgets.load();
  }

  requestPost() {
    const post = PostsStore.getPost(this.props.params.slug);
    post && (this.setState({post: post}));
  }

  requestPosts() {
    const posts = PostsStore.getPosts();
    posts && (this.setState({posts: posts}));
  }

  render() {
    console.log('State: ', this.state);
    const {posts} = this.state;
    const compName = 'singlepost';

    if (!posts)
      return null;

    const top5Posts = posts.slice(0,5);
    const otherPosts = posts.slice(5);
    const topPost = posts[0];

    const postsMap = top5Posts.map((post, index) => {
      var isTop, isExcerpt;
      isExcerpt = true;
      index === 0
        ? isTop = true
        : isTop = false;

      return (
        <li key={post.id}>
          <Post post={post} excerpt={isExcerpt} top={isTop}/>
        </li>
        );
    });

    return (
      <main>
        <section className={css.section + 'hero'}>
          <RespImageCover image={topPost.t_featured_image}/>
        </section>
        <Section compName={compName}>
          <ul className={css.list + compName}>
            {postsMap}
          </ul>
          <aside className={css.sidebar + compName}>
            <RecentPosts posts={otherPosts} currPost={topPost.id}/>
            <Insta/>
          </aside>
        </Section>
      </main>
    );
  }
}
