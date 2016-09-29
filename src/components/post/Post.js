import React from 'react';

export default class Post extends React.Component {

  render() {
    const {title, id, content} = this.props;

    return (
      <div>
        <h1>{title.rendered}</h1>
        <h2>{id}</h2>
        <div>{content.rendered}</div>
      </div>
    );
  }
}
