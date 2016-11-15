import React from 'react';
import css from '../../lib/css';

import ArticleHeader from '../article-header';
import Products from '../products';
import Wysiwyg from '../wysiwyg';

require('./_section.sass');

function Section(props) {
  var sectionClass, slug, sectionStyle, colClass, contentClass;
  const {title, content, subSections, position, modifier, image} = props;

  // Setup the section classes
  sectionClass = "normal-section";
  title && (slug = title.replace(/\s+/g, '-').toLowerCase());
  sectionClass += ' -' + slug;

  // Setup the background image
  if(image) {
    sectionStyle = {
      backgroundImage: 'url(' + image + ')',
    }
    sectionClass += css.hasbg;
  }

  // Setup the positioning classes
  colClass = "column-block"
  position && (colClass += ' -' + position);

  // Setup the article classes
  modifier ? contentClass = 'content-' + modifier : contentClass = "content-block";

  return (
    <section className={sectionClass} style={sectionStyle}>
      <div className={css.content}>
        <div className={colClass}>
          <div className={contentClass}>
            <ArticleHeader title={title} modifier={modifier} />
            <Wysiwyg content={content} modifier={modifier} />
          </div>
        </div>
      </div>
      <Products products={subSections} />
      { image && <img src={image} alt={title} className="_replaceimg"/> }
    </section>
  );
}

export default Section;
