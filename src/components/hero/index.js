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
  const {headlinePre, headline, headlinePost, content, image, fullscreen, size, centered} = props;
  var sectionStyle, sectionClass, wysiwygClass, displayHeadline;

  sectionClass = 'hero-section';
  fullscreen && (sectionClass += ' -fullscreen');

  wysiwygClass = css.wys;
  size && (wysiwygClass += ' -' + size);
  centered && (wysiwygClass += css.centered);

  if(image) {
    sectionStyle = {
      backgroundImage: 'url(' + image + ')',
    }
  }

  (headlinePre || headline || headlinePost) && (displayHeadline = true);

  return (
    <section className={sectionClass} style={sectionStyle}>
      <div className="hero-content">
        {displayHeadline && <HeroHeadline {...props} />}
        {content && <div className={wysiwygClass} dangerouslySetInnerHTML={{__html: content}}></div>}
      </div>
      { image && <img src={image} alt="" className="_replaceimg"/> }
    </section>
  );
}

export default Hero;
