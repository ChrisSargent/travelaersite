import React from 'react';
import {Link} from 'react-router';
import css from '../../lib/css';
import Screenshot from '../screenshot';

function SectionSub(props) {
  const {acf_fc_layout, title, content, linkTitle, linkTo, boxed} = props;
  var postClass = css.post;

  if (boxed) {
    postClass += ' ' + css.post + '--boxed';
  }

  var test = props.screenshots[0];
  console.log(test);

  return (
    <article className={acf_fc_layout}>
      <div className={postClass}>
        <h2>{title}</h2>
        <div className={css.wys} dangerouslySetInnerHTML={{__html: content}}></div>
        <Link to={linkTo} className="btn">{linkTitle}</Link>
      </div>
      <Screenshot image={test.screenshot}/>
    </article>
  )
}

export default SectionSub;
