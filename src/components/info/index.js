import React from 'react';
import dateFormat from '../../lib/date.js'

require('./_info.sass');

function Info(props) {
  var dateString;
  
  const {
    views,
    comments,
    shares,
    date,
    tags,
    author
  } = props.info;

  dateString = dateFormat(date);

  return (
    <div className="info-block">
      <span className="author">{dateString} by {author}</span>
      {views && <span className="info">{views}</span>}
      {comments && <span className="info">{comments}</span>}
      {shares && <span className="info">{shares}</span>}
      {tags && <span className="info">{tags}</span>}

    </div>
  )
}

export default Info;
