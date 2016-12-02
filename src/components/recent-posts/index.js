import React, {Component} from 'react';
import {Link} from 'react-router';
import css from '../../lib/css';
import globals from '../../lib/globals';
import dateFormat from '../../lib/date.js';
import PostsStore from '../../stores/PostsStore';

require('./_recent-posts.sass');

import ArticleHeader from '../article-header';
import Avatar from '../avatar';

export default class RecentPosts extends Component {
  constructor(props) {
    super(props);
    this.requestPosts = this.requestPosts.bind(this);
    this.state = {
      currPost: this.props.currPost
    };
  }

  componentWillMount() {
    this.setState({posts: PostsStore.getPosts()});
    PostsStore.on('change', this.requestPosts);
  }

  componentWillUnmount() {
    PostsStore.removeListener('change', this.requestPosts);
  }

  componentWillReceiveProps(props) {
    this.setState({
      currPost: props.currPost
    });
  }

  requestPosts() {
    this.setState({posts: PostsStore.getPosts()});
  }

  render() {
    const {posts} = this.state;
    const compName = 'recentposts';

    if (!posts)
      return null;

    const postsMap = posts.map((post, i) => {
      var dateString,
        articleStyle,
        modifier,
        avatar,
        icon;

      if (this.state.currPost === post.id || i > 7) {
        // Don't show the current posts in the latest posts list
        return null;
      }

      dateString = dateFormat(post.date_gmt, false);

      const compName = 'recentpost';
      const image = post.t_featured_image.url;
      const link = globals.blogUrl + '/' + post.slug;

      if (i < 2) {
        modifier = compName + ' -large';
        icon = 'post';
        avatar = false;

        if (image) {
          articleStyle = {
            backgroundImage: 'url(' + image + ')'
          }
        }
      } else {
        modifier = compName;
        icon = false;
        avatar = true;
      }
      return (
        <li key={post.id} className={css.item}>
          <Link to={link}>
            <article className={css.article + modifier} style={articleStyle}>
              {avatar && <Avatar avatar={image} modifier={modifier}/>}
              <ArticleHeader title={post.title} subtitle={dateString} icon={icon} modifier={modifier}/>
              {image && (i < 2) && <img src={image} className={css.replImg} ref={this.handleRef}/>}
            </article>
          </Link>
        </li>
      );
    });

    return (
      <ul className={css.list + compName}>
        {postsMap}
      </ul >
    );
  }
}
