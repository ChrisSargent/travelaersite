import React, {Component} from 'react'
import {withRouter} from 'react-router'
import css from '../../lib/css'
import {convertLinks} from '../../lib/utils'
import {Link} from 'react-router'
import './_wysiwyg.sass'

class Wysiwyg extends Component {
  constructor() {
    super()
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(ev) {
    const targetURL = ev.target.href
    if (!targetURL)
      return

    if (targetURL.indexOf('http://') === 0 || targetURL.indexOf('https://') === 0) {
      ev.preventDefault()
      const pathname = ev.target.pathname
      this.props.router.push(pathname)
    }
  }

  render() {
    const {more} = this.props
    var {size, content} = this.props
    var wysClass

    if (!content)
      return false

    const compName = 'wysiwyg'
    wysClass = compName
    size && (wysClass += ' -' + size)

    content.rendered && (content = content.rendered)
    content = convertLinks(content)

    return (
      <div className={wysClass}>
        <div onClick={this.handleClick} dangerouslySetInnerHTML={{
          __html: content
        }}></div>
        {more && <Link to={more} className={css.more}>&raquo;&nbsp;Read More</Link>}
      </div>
    )
  }
}

export default withRouter(Wysiwyg)
