import React from 'react';

function Post(props) {
  const {title, id, content} = props;

  return (
    <div>
      <h1>{title.rendered}</h1>
      <h2>{id}</h2>
      <div>{content.rendered}</div>
    </div>
  );
}

export default Post;
