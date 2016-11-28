import React from 'react';
import css from '../../lib/css';
import Icon from '../icons';
import Wysiwyg from '../wysiwyg';

require('./_hero.sass');

function HeroHeadline(props) {
  const {headlinePre, headline, headlinePost, headlineImage} = props;

  if (!headlinePre && !headline && !headlinePost && !headlineImage)
    return null;

  return (
    <h1 className={css.title}>
      {headlinePre}
      {headline && <strong>{headline}</strong>}
      {headlineImage && <Icon type={headlineImage}/>}
      {headlinePost}
    </h1>
  );
};

function Hero(props) {
  var sectionStyle,
    modifier = '';

  const {content, image, fullscreen, paragraphWidth} = props;
  const compName = 'hero';

  fullscreen && (modifier = ' -fullscreen');

  if (image) {
    sectionStyle = {
      backgroundImage: 'url(' + image + ')'
    }
  }

  return (
    <section className={css.section + compName} style={sectionStyle}>
      <div className={css.content + compName + modifier}>
        <HeroHeadline {...props}/>
        <Wysiwyg content={content} size={paragraphWidth}/>
      </div>
      {image && <img src={image} className={css.replImg}/>}
    </section>
  );
};

export default Hero;
