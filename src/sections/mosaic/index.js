import React, {PureComponent} from 'react'
import css from '../../lib/css'
import ContentTile from '../../components/tile/content'
import TeamTile from '../../components/tile/team'
import SVGFilters from '../../components/svg-filters'
import './_mosaic.sass'

class Mosaic extends PureComponent {
  constructor() {
    super()
    this.resizeDebounce = this.resizeDebounce.bind(this)
    this.checkLastItem = this.checkLastItem.bind(this)
    this.handleResize = this.handleResize.bind(this)
    this.resizeTOut = 0
  }

  componentDidMount() {
    window.addEventListener("resize", this.resizeDebounce);
  }

  resizeDebounce() {
    clearTimeout(this.resizeTOut);
    this.resizeTOut = setTimeout(this.handleResize, 200);
  }

  handleResize() {
    this.checkLastItem()
  }

  checkLastItem(el) {
    !this.lastItem && (this.lastItem = el.lastChild)
    if (this.lastItem.clientWidth === window.innerWidth) {
      this.lastItem.classList.add('-hide')
    } else {
      this.lastItem.classList.remove('-hide')
    }
  }

  render() {
    const {tiles, compName, type} = this.props
    var tileMap = null,
      filters = null

    if (!tiles)
      return null

    switch (type) {
      case 'team':
        tileMap = tiles.map((tile, index) => {
          return <TeamTile key={tile.id} {...tile.acf} title={tile.title} />
        })
        filters = <SVGFilters/>
        break

      case 'content':
        tileMap = tiles.map((tile, index) => {
          return <ContentTile key={tile.id} {...tile.acf} />
        })
        break

      default:
    }
    return (
      <div>
        <ul className={css.list + compName + ' -' + type} ref={this.checkLastItem}>
          {tileMap}
        </ul>
        {filters}
      </div>
    )
  }
}

export default Mosaic
