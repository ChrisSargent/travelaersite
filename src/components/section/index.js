import React from 'react';
import css from '../../lib/css';

import ArticleHeader from '../article-header';
import Products from '../products';
import Wysiwyg from '../wysiwyg';

require('./_section.sass');

function Section(props) {
  var sectionClass,
    slug,
    sectionStyle,
    colClass,
    articleClass;
  const {
    title,
    content,
    subSections,
    position,
    modifier,
    image
  } = props;

  // Setup the section classes
  sectionClass = css.section + css.default;
  title && (slug = title.replace(/\s+/g, '-').toLowerCase());
  slug && (sectionClass += ' -' + slug);

  // Setup the background image
  if (image) {
    sectionStyle = {
      backgroundImage: 'url(' + image + ')'
    }
    sectionClass += css.hasbg;
  }

  // Setup the positioning classes
  colClass = "column-block"
  position && (colClass += ' -' + position);

  // Setup the article classes
  articleClass = css.article + css.default;
  modifier && (articleClass += ' -' + modifier)

  return (
    <section className={sectionClass} style={sectionStyle}>
      <div className={css.container}>
        <div className={colClass}>
          <div className={articleClass}>
            <ArticleHeader title={title} modifier={modifier}/>
            <Wysiwyg content={content}/>
          </div>
        </div>
      </div>
      <Products products={subSections}/> {image && <img src={image} alt={title} className={css.replImg}/>}
    </section>
  );
}

export default Section;
