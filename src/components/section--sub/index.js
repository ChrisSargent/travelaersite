import React from 'react';
import {Link} from 'react-router';
import css from '../../lib/css';
import Screenshot from '../screenshot';

function SectionSub(props) {
  const {acf_fc_layout, title, content, linkTitle, linkTo, boxed, screenshots} = props;
  var postClass = css.post, screenshotsMap;

  if (boxed) {
    postClass += ' ' + css.post + '--boxed';
  }

  if (screenshots) {
    screenshotsMap = screenshots.map((screenshot, index) => {
      if(screenshot.image) {
        return <Screenshot key={index} image={screenshot.image}/>
      } else {
        return false;
      }
    });
  }

  console.log(screenshots[0]);

  return (
    <article className={acf_fc_layout}>
      <div className={postClass}>
        <h2>{title}</h2>
        <div className={css.wys} dangerouslySetInnerHTML={{__html: content}}></div>
        <Link to={linkTo} className="btn">{linkTitle}</Link>
      </div>
      { screenshots[0].image ? <div className="screenshot__wrap">{screenshotsMap}</div> : false}
    </article>
  )
}

export default SectionSub;
