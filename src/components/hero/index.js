import React from 'react';
import css from '../../lib/css';

require('./_hero.sass');

function Hero(props) {
  const {headlinePre, headline, headlinePost, content, image} = props;
  var sectionStyle;

  if(image) {
    sectionStyle = {
      backgroundImage: 'url(' + image + ')',
    }
  }

  return (
    <section className="hero-block" style={sectionStyle}>
        <div className="hero-content">
          <h1 className={css.header}>
            {headlinePre}
            <strong>{headline}</strong>
            {headlinePost}
          </h1>
          <div className={css.wys} dangerouslySetInnerHTML={{__html: content}}></div>
        </div>
      { image ? <img src={image} alt="" className="_replaceimg"/> : false }
    </section>
  );
}

export default Hero;
