import React, {PureComponent} from 'react'
import Link from 'react-router/lib/Link'
import withRouter from 'react-router/lib/withRouter'
import {convertLinks} from '../../lib/utils'
import css from '../../lib/css'
import './_wysiwyg.sass'

class Wysiwyg extends PureComponent {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
    this.content = convertLinks(this.props.content)
  }

  handleClick(ev) {
    const targetURL = ev.target.href
    if (!targetURL)
      return

    if (targetURL.indexOf('http://' + document.domain) === 0) {
      ev.preventDefault()
      const pathname = ev.target.pathname
      this.props.router.push(pathname)
    }
  }

  render() {
    const {size, more} = this.props
    var wysClass

    if (!this.content)
      return false

    const compName = 'wysiwyg'
    wysClass = compName
    size && (wysClass += ' -' + size)

    return (
      <div className={wysClass}>
        <div onClick={this.handleClick} dangerouslySetInnerHTML={{__html: this.content}}></div>
        {more && <Link to={more} className={css.more}>&raquo;&nbsp;Read More</Link>}
      </div>
    )
  }
}

export default withRouter(Wysiwyg)
