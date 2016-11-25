import React from 'react';
import css from '../../lib/css';

import Wysiwyg from '../wysiwyg';

require('./_image-banner.sass');

function Strip(props) {
  const {title, content} = props;
  const compName = 'strip';

  return (
    <div className={css.block + compName}>
      <div className={css.content + compName}>
        <h1 className={css.title}>{title}</h1>
        <Wysiwyg content={content} modifier={compName} />
      </div>
    </div>
  )
}

function ImageBanner(props) {
  const {image} = props;
  const compName = 'imagebanner';

  return (
    <section className={css.section + compName}>
      <div className={css.content + compName}>
        <div className="image">
          <img src={image}/>
        </div>
        <Strip {...props} />
      </div>
    </section>
  )
}

export default ImageBanner;
