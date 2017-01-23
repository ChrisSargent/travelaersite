import React from 'react';
import css from '../../lib/css';

import ArticleHeader from '../../components/article-header';
import ProductList from '../../components/product-list';
import Wysiwyg from '../../components/wysiwyg';

import './_products.sass';

function Products(props) {
  var articleClass;
  const {
    title,
    content,
    products,
    position,
    compName,
    alignment
  } = props;

  // Setup the positioning classes
  articleClass = css.article + compName;
  position && (articleClass += ' -' + position);

  return (
    <div className={css.main + compName}>
      {(title || content) &&
        <div className={articleClass}>
          <ArticleHeader title={title} modifier={compName}/>
          <Wysiwyg content={content}/>
        </div>
      }
      <ProductList products={products} alignment={alignment}/>
    </div>
  );
}

export default Products;
