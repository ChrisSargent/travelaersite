import React, {PureComponent} from 'react'
import Quote from '../../components/quote'
import Slider from '../../components/slider'
import './_quotes.sass'

class Quotes extends PureComponent {
  constructor(props) {
    super(props)
    this.compName = this.props.compName
    this.setupQuoteMap = this.setupQuoteMap.bind(this)
    this.setupQuoteMap()
  }

  setupQuoteMap() {
    this.quotesMap = []
    const {quotes} = this.props

    this.quotesMap = quotes.map((quote, index) => {
      const {name, content, job_title, company} = quote.acf
      return (
        <Quote content={content} name={name} jobTitle={job_title} company={company} modifier={this.compName} />
      )
    })
  }

  render() {
    return (
      <Slider slides={this.quotesMap} id={this.compName} auto="5" />
    )
  }
}

export default Quotes
