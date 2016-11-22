import React from 'react';
import globals from '../../lib/globals'

function PostItem(props) {
  const {title, slug} = props;
  const link = globals.blogUrl + '/' + slug;

  return (
    <li>
      <article>
        <a href={link}>
          {title && <h1>{title.rendered}</h1>}
        </a>
      </article>
    </li>
  );
}

export default PostItem;
