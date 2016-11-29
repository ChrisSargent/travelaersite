import React from 'react';
import css from '../../lib/css';
import SVG from '../svg';
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
      {headlineImage && <SVG type={headlineImage}/>}
      {headlinePost}
    </h1>
  );
};

function Hero(props) {
  var sectionStyle,
    modifier = '';

  const {content, image, fullscreen, paragraphWidth, contentImage} = props;
  const compName = 'hero';

  fullscreen && (modifier = ' -fullscreen');
  contentImage && (modifier = ' -fullwidth');

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
        {contentImage && <SVG type={contentImage}/>}
      </div>
      {image && <img src={image} className={css.replImg}/>}
    </section>
  );
};

export default Hero;
