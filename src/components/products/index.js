import React from 'react';
import css from '../../lib/css';

import ArticleHeader from '../article-header';
import ProductList from '../product-list';
import RespImageCover from '../resp-image-cover';
import Section from '../section';
import Wysiwyg from '../wysiwyg';

require('./_products.sass');

function Products(props) {
  var articleClass;
  const {
    title,
    content,
    products,
    position,
    image
  } = props;
  const compName = 'products'

  // Setup the positioning classes
  articleClass = css.article + compName;
  position && (articleClass += ' -' + position);

  return (
    <Section compName={compName}>
      <div className={articleClass}>
        <ArticleHeader title={title} modifier={compName}/>
        <Wysiwyg content={content}/>
      </div>
      <ProductList products={products}/>
      <RespImageCover image={image} modifier={compName}/>
    </Section>
  );
}

export default Products;
