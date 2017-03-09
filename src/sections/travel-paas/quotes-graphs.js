import React from 'react'
import css from '../../lib/css'
import Wysiwyg from '../../components/wysiwyg'
import './_travel-paas.sass'

const QuotesGraphs = ({compName, graphs, quotes, title}) => {
  const quoteMap = quotes.map((quote, index) => {
    console.log(quote);

    return (
      <li key={index} className={css.item}>{quote.acf.content}
      </li>
    )
  })
  const graphMap = graphs.map((graph, index) => {

    return (
      <li key={index} className={css.item}>{graph.graph}
      </li>
    )
  })

  return (
    <div className={css.main + compName}>
      <h2 className={css.title}>{title}</h2>
      <ul className={css.list + compName}>
        {quoteMap}
      </ul>
      <ul className={css.list + compName}>
        {graphMap}
      </ul>
    </div>
  )
}

export default QuotesGraphs
