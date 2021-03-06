import React from 'react'
import css from '../../lib/css'
import Quote from '../../components/quote'
import Wysiwyg from '../../components/wysiwyg'
import './_travel-paas.sass'
import './_list-graphs.sass'

const QuotesGraphs = ({compName, graphs, quotes, title, content}) => {
  const quoteMap = quotes.map((quote, index) => {
    const {name, content, job_title, company} = quote.acf

    return (
      <li key={index} className={css.item}>
        <Quote content={content} name={name} jobTitle={job_title} company={company} />
      </li>
    )
  })

  const graphMap = graphs.map((graph, index) => {
    const fillPercent = 50 + (parseFloat(graph.bar_percentage) / 2)
    const barStyle = {
      backgroundImage: 'linear-gradient(to right, #4a806a 0%, #4a806a 50%, #6da54c 50%, #6da54c ' + fillPercent + '%, transparent ' + fillPercent + '%)'
    }

    return (
      <li key={index} className={css.item}>
        <span className='desc'>{graph.graph}</span>
        <div className='bar' style={barStyle}></div>
      </li>
    )
  })

  return (
    <div className={css.main + compName}>
      <h2 className={css.title}>{title}</h2>
      <Wysiwyg content={content} />
      <div className={css.container}>
        <div className="tpaas-content">
          <ul className={css.list + 'quotes'}>
            {quoteMap}
          </ul>
        </div>
        <div className="tpaas-graphics">
          <ul className={css.list + 'graphs'}>
            {graphMap}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default QuotesGraphs
