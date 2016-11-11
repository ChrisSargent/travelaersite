import React from 'react';
import css from '../../lib/css';

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
}

function Hero(props) {
  const {headlinePre, headline, headlinePost, content, image, fullscreen} = props;
  var sectionStyle, sectionClass, displayHeadline;

  sectionClass = 'hero-content';

  if(image) {
    sectionStyle = {
      backgroundImage: 'url(' + image + ')',
    }
  }

  if(headlinePre || headline || headlinePost) {
    displayHeadline = true;
  }

  if(fullscreen) {
    sectionClass += ' -fullscreen'
  }

  return (
    <section className="hero-section" style={sectionStyle}>
      <div className={sectionClass}>
        {displayHeadline && <HeroHeadline {...props} />}
        {content && <div className={css.wys} dangerouslySetInnerHTML={{__html: content}}></div>}
      </div>
      { image && <img src={image} alt="" className="_replaceimg"/> }
    </section>
  );
}

export default Hero;
