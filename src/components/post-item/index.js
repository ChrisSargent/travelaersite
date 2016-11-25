import React from 'react';
import globals from '../../lib/globals'
import {Link} from 'react-router';

function PostItem(props) {
  const {title, slug} = props;
  const link = globals.blogUrl + '/' + slug;

  return (
    <li>
      <Link to={link}>{title && <h1>{title.rendered}</h1>}</Link>
    </li>
  );
}

export default PostItem;
