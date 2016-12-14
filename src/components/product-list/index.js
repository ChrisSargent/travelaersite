import React from 'react';
import css from '../../lib/css';

import Actions from '../actions';
import ArticleHeader from '../article-header';
import Screenshots from '../screenshots';
import Wysiwyg from '../wysiwyg';

require('./_product-list.sass');

function ProductList(props) {
  const {products} = props;
  const compName = 'product';

  if (!products)
    return null;

  const productsMap = products.map((product, index) => {
    var articleClass;
    var {actions} = product;
    const {
      title,
      content,
      boxed,
      screenshots,
    } = product;

    actions[0].modifier = 'cta';
    articleClass = css.article + compName;
    boxed && (articleClass += ' -boxed');

    return (
      <li key={product.id || index} className={css.item}>
        <article className={articleClass}>
          <ArticleHeader title={title} modifier={compName}/>
          <Wysiwyg content={content}/>
          <Actions actions={actions}/>
        </article>
        <Screenshots screenshots={screenshots} modifier="home"/>
      </li>
    );
  });

  return (
    <ul className={css.list + compName}>{productsMap}</ul>
  );
}

export default ProductList;
