import React, {PureComponent} from 'react'
import css from '../../lib/css'
import NewsItem from '../../components/news-item'
import Slider from '../../components/slider'
import './_news.sass'

class News extends PureComponent {
  constructor(props) {
    super(props)
    this.compName = this.props.compName
    this.setupNewsMap = this.setupNewsMap.bind(this)
    this.setupNewsMap()
  }

  setupNewsMap() {
    const {news} = this.props
    if (!news || !news.length)
      return

    this.newsMap = news.map((newsItem, index) => {
      return (
        <NewsItem key={index} post={newsItem} />
      )
    })
  }

  render() {
    if (!this.newsMap)
      return null

    return (
      <div className={css.main + this.compName}>
        <h1 className={css.title}>Our Latest News</h1>
        <Slider slides={this.newsMap} id={this.compName} auto="5" />
      </div>
    )
  }
}

export default News
