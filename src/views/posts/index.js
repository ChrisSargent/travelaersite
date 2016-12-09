import React, {Component} from 'react';
import css from '../../lib/css'
import globals from '../../lib/globals'
import {Link} from 'react-router';

require('./_posts.sass');

// Stores & Actions
import PostsStore from '../../stores/PostsStore';

export default class Posts extends Component {
  constructor() {
    super();
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

  requestPosts() {
    const posts = PostsStore.getPosts();
    posts && (this.setState({posts: posts}));
  }

  render() {
    const {posts} = this.state;

    if (!posts)
      return null;

    const compName = 'posts';

    const postsMap = posts.map((post) => {
      const link = globals.blogUrl + '/' + post.slug;
      return (
        <li key={post.id}>
          <Link to={link}><h1>{post.title.rendered}</h1></Link>
        </li>
        );
    });

    return (
      <main id={compName} className={compName}>
        <section>
          <ul className={css.list + compName}>
            {postsMap}
          </ul>
        </section>
      </main>
    );
  }
}
