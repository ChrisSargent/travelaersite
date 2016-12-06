import React from 'react';
import css from '../../lib/css';
import dateFormat from '../../lib/date'

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
  const compName = 'info';

  dateString = dateFormat(date);

  return (
    <aside className={css.block + compName}>
      <span className="author">{dateString} by {author}</span>
      {views && <span className="info">{views}</span>}
      {comments && <span className="info">{comments}</span>}
      {shares && <span className="info">{shares}</span>}
      {tags && <span className="info">{tags}</span>}
    </aside>
  )
}

export default Info;
