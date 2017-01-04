import React, {Component} from 'react';
import css from '../../lib/css'
import Insta from '../../components/insta';
import Post from '../../components/post';
import PostsStore from '../../stores/PostsStore';
import RecentPosts from '../../components/recent-posts';
import Section from '../../components/section';

require('./_posts.sass')

export default class Posts extends Component {
  constructor(props) {
    super(props);
    this.requestPostsObj = this.requestPostsObj.bind(this);
    this.state = {};
  }

  componentWillMount() {
    this.requestPostsObj();
    PostsStore.on('change', this.requestPostsObj);
  }

  componentWillUnmount() {
    PostsStore.removeListener('change', this.requestPostsObj);
  }

  componentWillReceiveProps(newProps) {
    if (this.props.params.slug === newProps.params.slug)
      return;

    const postsObj = PostsStore.getPostsObj(newProps.params.slug);
    postsObj && (this.setState({postsObj: postsObj}));
  }

  componentDidUpdate() {
    window.twttr && window.twttr.widgets.load();
  }

  requestPostsObj() {
    const {slug} = this.props.params;
    const postsObj = PostsStore.getPostsObj(slug);
    postsObj && (this.setState({postsObj: postsObj}));
  }

  render() {
    var modifier;
    const {postsObj} = this.state;
    const compName = 'posts';
    const overlaps = [{
      type: 'single',
      position: 'bottom',
      colour: 'white'
    }];

    if (!postsObj)
      return null;

    postsObj.posts.length > 1
      ? modifier = ' -small'
      : modifier = '';

    const postsMap = postsObj.posts.map((post, index) => {
      var isMain;

      index === 0
        ? isMain = true
        : isMain = false;

      return (
        <li key={post.id} className={css.item}>
          <Post post={post} excerpt={postsObj.excerpts} main={isMain}/>
        </li>
      );
    });

    return (
      <main>
        <Section compName={'hero' + modifier} image={postsObj.image} skew="bottom" overlaps={overlaps}/>
        <Section compName={compName}>
          <ul className={css.list + compName}>
            {postsMap}
          </ul>
          <aside className={css.sidebar + compName}>
            <RecentPosts posts={postsObj.side} />
            <Insta/>
          </aside>
        </Section>
      </main>
    );
  }
}
