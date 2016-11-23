import React, {Component} from 'react';

// Stores & Actions
import PostsStore from '../../stores/PostsStore';

// Components
import PostItem from '../../components/post-item';

export default class Posts extends Component {
  constructor() {
    super();
    this.requestPosts = this.requestPosts.bind(this);
    this.state = {};
  }

  componentWillMount() {
    this.setState({posts: PostsStore.getPosts()});
    PostsStore.on('change', this.requestPosts);
  }

  componentWillUnmount() {
    PostsStore.removeListener('change', this.requestPosts);
  }

  requestPosts() {
    this.setState({posts: PostsStore.getPosts()});
  }

  render() {
    const {posts} = this.state;

    if (!posts) {
      return null;
    }

    const postsMap = posts.map((post) => {
      return (<PostItem key={post.id} {...post}/>);
    });

    return (
      <main id="posts" className="posts">
        <section>
          <ul>
            {postsMap}
          </ul>
        </section>
      </main>
    );
  }
}
