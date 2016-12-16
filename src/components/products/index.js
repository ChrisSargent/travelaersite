import React from 'react';
import css from '../../lib/css';

import ArticleHeader from '../article-header';
import ProductList from '../product-list';
import RespImageCover from '../resp-image-cover';
import Wysiwyg from '../wysiwyg';

require('./_products.sass');

function Products(props) {
  var articleClass;
  const {
    title,
    content,
    products,
    position,
    image,
    compName
  } = props;

  // Setup the positioning classes
  articleClass = css.article + compName;
  position && (articleClass += ' -' + position);

  return (
    <div className={css.block + compName}>
      <div className={articleClass}>
        <ArticleHeader title={title} modifier={compName}/>
        <Wysiwyg content={content}/>
      </div>
      <ProductList products={products}/>
      <RespImageCover image={image} modifier={compName}/>
    </div>
  );
}

export default Products;
