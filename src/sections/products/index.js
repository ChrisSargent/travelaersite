import React from 'react'
import ArticleHeader from '../../components/article-header'
import css from '../../lib/css'
import ProductList from '../../components/product-list'
import Wysiwyg from '../../components/wysiwyg'
import './_products.sass'

const Products = ({title, content, products, position, compName, alignment}) => {
  var articleClass

  articleClass = css.article + compName
  position && (articleClass += ' -' + position)

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
  )
}

export default Products
