import React from 'react'
import Actions from '../actions'
import ArticleHeader from '../article-header'
import css from '../../lib/css'
import Screenshots from '../screenshots'
import Wysiwyg from '../wysiwyg'
import './_product-list.sass'

const ProductList = ({products, alignment}) => {
  if (!products)
    return null

  const compName = 'product'
  const productsMap = products.map((product) => {
    var {actions} = product.acf
    const {screenshots} = product.acf
    const {title, content} = product

    actions[0].modifier = 'cta'

    return (
      <li key={product.id} className={css.item}>
        <article className={css.article + compName}>
          <ArticleHeader title={title} modifier={compName}/>
          <Wysiwyg content={content}/>
          <Actions actions={actions}/>
        </article>
        <Screenshots screenshots={screenshots} modifier="home"/>
      </li>
    )
  })

  return (
    <ul className={css.list + compName + ' -' + alignment}>{productsMap}</ul>
  )
}

export default ProductList
