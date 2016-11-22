import React, {Component} from 'react';

// Stores & Actions
import * as PostsActions from '../../actions/PostsActions';
import PostsStore from '../../stores/PostsStore';

// Components
import PostItem from '../../components/post-item';

export default class Posts extends Component {
  constructor() {
    super();
    this.requestPosts = this.requestPosts.bind(this);
    this.state = {
      posts: PostsStore.getPosts()
    };
  }

  componentWillMount() {
    PostsActions.fetchPosts();
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

    if(posts.length > 0) {
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
    } else {
      return null;
    }

  }
}
