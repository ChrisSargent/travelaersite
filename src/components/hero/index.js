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
  const compName = 'hero';
  var sectionStyle, displayHeadline, modifier = '';

  fullscreen && (modifier = ' -fullscreen');

  if(image) {
    sectionStyle = {
      backgroundImage: 'url(' + image + ')',
    }
  }

  (headlinePre || headline || headlinePost || headlineImage) && (displayHeadline = true);

  return (
    <section className={css.section + compName} style={sectionStyle}>
      <div className={css.content + compName + modifier}>
        {displayHeadline && <HeroHeadline {...props} />}
        <Wysiwyg content={content} size={size} modifier={compName}/>
      </div>
      { image && <img src={image} className={css.replImg}/> }
    </section>
  );
};

export default Hero;
