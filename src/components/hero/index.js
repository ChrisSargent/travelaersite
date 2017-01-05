import React from 'react';
import css from '../../lib/css';

import SVG from '../svg';
import Wysiwyg from '../wysiwyg';

import './_hero.sass';

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
    fullscreen,
    paragraphWidth,
    contentImage,
  } = props;

  fullscreen && (modifier = ' -fullscreen');
  contentImage && (modifier = ' -fullwidth');

  if (headlinePre || headline || headlinePost || headlineImage)
    hasHeadline = true;

  return (
    <div className={css.main + compName + modifier}>
      {hasHeadline && <h1 className={css.title}>
        {headlinePre}
        {headline && <strong>{headline}</strong>}
        {headlinePost}
        <SVG type={headlineImage}/>
      </h1>}
      <Wysiwyg content={content} size={paragraphWidth}/>
      <SVG type={contentImage}/>
    </div>
  );
};

export default Hero;
