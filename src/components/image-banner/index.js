import React from 'react';
import css from '../../lib/css';

import RespImage from '../resp-image';
import Wysiwyg from '../wysiwyg';

require('./_image-banner.sass');

function Strip(props) {
  const {title, content} = props;
  const compName = 'strip';

  return (
    <div className={css.block + compName}>
      <div className={css.article + compName}>
        <h1 className={css.title}>{title}</h1>
        <Wysiwyg content={content} />
      </div>
    </div>
  )
}

function ImageBanner(props) {
  const compName = 'imagebanner';

  return (
    <section className={css.section + compName}>
      <div className={css.content + compName}>
        <RespImage image={props.image} srcVersion='large' respSizes="100vw"/>
        <Strip {...props} />
      </div>
    </section>
  )
}

export default ImageBanner;
