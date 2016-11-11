import React from 'react';
import globals from '../../lib/globals'

function PostItem(props) {
  const {title, content, slug} = props;
  const link = globals.blogUrl + '/' + slug;

  return (
    <li>
      <article>
        <a href={link}>
          {title ? <h1>{title.rendered}</h1> : false}
          {content ? <div className="wysiwyg-block" dangerouslySetInnerHTML={{__html: content.rendered}}></div> : false}
        </a>
      </article>
    </li>
  );
}

export default PostItem;
