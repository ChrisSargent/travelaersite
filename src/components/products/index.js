import React from 'react';
import css from '../../lib/css';

import ArticleHeader from '../article-header';
import ProductList from '../product-list';
import Wysiwyg from '../wysiwyg';

require('./_products.sass');

function Products(props) {
  var articleClass;
  const {
    title,
    content,
    products,
    position,
    compName
  } = props;

  // Setup the positioning classes
  articleClass = css.article + compName;
  position && (articleClass += ' -' + position);

  return (
    <div className={css.main + compName}>
      <div className={articleClass}>
        <ArticleHeader title={title} modifier={compName}/>
        <Wysiwyg content={content}/>
      </div>
      <ProductList products={products}/>
    </div>
  );
}

export default Products;
