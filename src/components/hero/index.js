import React from 'react';
import css from '../../lib/css';
import Icon from '../icons';
import Wysiwyg from '../wysiwyg';

require('./_hero.sass');

function HeroHeadline(props) {
  const {headlinePre, headline, headlinePost, headlineImage} = props;

  return (
    <h1 className={css.title}>
      {headlinePre}
      {headline && <strong>{headline}</strong>}
      {headlineImage && <Icon type={headlineImage} />}
      {headlinePost}
    </h1>
  );
};

function Hero(props) {
  const {headlinePre, headline, headlineImage, headlinePost, content, image, fullscreen, size} = props;
  var sectionStyle, contentClass, displayHeadline;

  contentClass = 'content-hero';
  fullscreen && (contentClass += ' -fullscreen');

  if(image) {
    sectionStyle = {
      backgroundImage: 'url(' + image + ')',
    }
  }

  (headlinePre || headline || headlinePost || headlineImage) && (displayHeadline = true);

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
