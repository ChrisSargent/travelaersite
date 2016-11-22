import React from 'react';
import css from '../../lib/css';
import Wysiwyg from '../wysiwyg';

require('./_hero.sass');

function HeroHeadline(props) {
  const {headlinePre, headline, headlinePost} = props;

  return (
    <h1 className={css.header}>
      {headlinePre}
      <strong>{headline}</strong>
      {headlinePost}
    </h1>
  );
};

function Hero(props) {
  const {headlinePre, headline, headlinePost, content, image, fullscreen, size} = props;
  var sectionStyle, contentClass, displayHeadline;

  contentClass = 'content-hero';
  fullscreen && (contentClass += ' -fullscreen');

  if(image) {
    sectionStyle = {
      backgroundImage: 'url(' + image + ')',
    }
  }

  (headlinePre || headline || headlinePost) && (displayHeadline = true);

  return (
    <section className="hero-section" style={sectionStyle}>
      <div className={contentClass}>
        {displayHeadline && <HeroHeadline {...props} />}
        <Wysiwyg content={content} size={size} modifier="hero"/>
      </div>
      { image && <img src={image} alt="" className="_replaceimg"/> }
    </section>
  );
};

export default Hero;
