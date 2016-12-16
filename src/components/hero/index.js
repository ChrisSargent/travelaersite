import React from 'react';
import css from '../../lib/css';

import SVG from '../svg';
import RespImageCover from '../resp-image-cover';
import Wysiwyg from '../wysiwyg';

require('./_hero.sass');

function Hero(props) {
  var modifier = '';
  var hasHeadline = false;
  const {
    compName,
    headlinePre,
    headline,
    headlinePost,
    headlineImage,
    content,
    image,
    fullscreen,
    paragraphWidth,
    contentImage,
    waitForHeroLoad
  } = props;

  fullscreen && (modifier = ' -fullscreen');
  contentImage && (modifier = ' -fullwidth');

  if (headlinePre || headline || headlinePost || headlineImage)
    hasHeadline = true;

  return (
    <div className={css.content + compName + modifier}>
      {hasHeadline && <h1 className={css.title}>
        {headlinePre}
        {headline && <strong>{headline}</strong>}
        {headlinePost}
        <SVG type={headlineImage}/>
      </h1>}
      <Wysiwyg content={content} size={paragraphWidth}/>
      <SVG type={contentImage}/>
      <RespImageCover image={image} wait={waitForHeroLoad}/>
    </div>
  );
};

export default Hero;
