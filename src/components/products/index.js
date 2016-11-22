import React from 'react';
import Actions from '../actions';
import ArticleHeader from '../article-header';
import Screenshots from '../screenshots';
import Wysiwyg from '../wysiwyg';

require('./_products.sass');

function Product(props) {
  const {title, content, actions, boxed, screenshots, modifier} = props;
  var articleClass;

  modifier ? articleClass = 'article-' + modifier : articleClass = "article-block";
  boxed && (articleClass += ' -boxed');

  return (
    <div>
    <article className={articleClass}>
      <ArticleHeader title={title} modifier={modifier} />
      <Wysiwyg content={content} modifier={modifier} />
      <Actions actions={actions} modifier="cta" />
    </article>
    <Screenshots screenshots={screenshots} />
    </div>
  )
}

function Products(props) {
  var productsMap;
  const {products} = props;

  if (products) {
    productsMap = products.map((product, index) => {
      return (
        <li key={product.id || index} className="item">
          <Product {...product} />
        </li>
      );
    });

    return (
      <ul className="product-list">{productsMap}</ul>
    );
  } else {
    return false;
  }

}

export default Products;
