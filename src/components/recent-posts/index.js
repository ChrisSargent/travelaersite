import React from 'react';
import {Link} from 'react-router';
import css from '../../lib/css';
import dateFormat from '../../lib/date';
import globals from '../../lib/globals';

import './_recent-posts.sass';

import ArticleHeader from '../article-header';
import RespImageCover from '../resp-image-cover';

function RecentPosts(props) {
  const {posts} = props;
  const compName = 'recentposts';

  if (!posts)
    return null;

  const postsMap = posts.map((post, index) => {
    var modifier,
      icon;

    const compName = 'recentpost';
    const dateString = dateFormat(post.date_gmt, false);
    const link = globals.blogUrl + '/' + post.slug;

    if (index < 2) {
      modifier = compName + ' -large';
      icon = 'post';
    } else {
      modifier = compName;
      icon = false;
    }
    return (
      <li key={post.id} className={css.item}>
        <Link to={link}>
          <article className={css.article + modifier}>
            <RespImageCover image={post.t_featured_image} srcVersion="medium" respSizes="350px" alt={post.title}/>
            <ArticleHeader title={post.title} subtitle={dateString} icon={icon} modifier={modifier}/>
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

export default RecentPosts;
