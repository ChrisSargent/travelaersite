import React from 'react';
import css from '../../lib/css';

import ArticleHeader from '../article-header';
import Products from '../products';
import ImageCover from '../image-cover';
import Wysiwyg from '../wysiwyg';

require('./_section.sass');

function Section(props) {
  var sectionClass,
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
  title && (sectionClass += ' -' + title.replace(/\s+/g, '-').toLowerCase());

  // Setup the positioning classes
  colClass = css.column;
  position && (colClass += ' -' + position);

  // Setup the article classes
  articleClass = css.article + css.default;
  modifier && (articleClass += ' -' + modifier)

  return (
    <section className={sectionClass}>
      <div className={css.container}>
        <div className={colClass}>
          <div className={articleClass}>
            <ArticleHeader title={title} modifier={modifier}/>
            <Wysiwyg content={content}/>
          </div>
        </div>
      </div>
      <Products products={subSections}/>
      <ImageCover image={image}/>
    </section>
  );
}

export default Section;
