import React, {PureComponent} from 'react'
import Link from 'react-router/lib/Link'
import withRouter from 'react-router/lib/withRouter'
import AnimateHeight from 'react-animate-height';
import {convertLinks, globals, splitExcerpt} from '../../lib/utils'
import css from '../../lib/css'
import './_wysiwyg.sass'

class Wysiwyg extends PureComponent {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
    this.toggleContent = this.toggleContent.bind(this)
    this.handleWithRouter = this.handleWithRouter.bind(this)
    this.content = convertLinks(this.props.content)
    this.content = splitExcerpt(this.content)
    this.state = {
      expanded: this.content.excerpt
        ? 0
        : 'auto'
    }
  }

  handleClick(ev) {
    const {target} = ev

    if (target.href && target.href.indexOf(document.domain) >= 0) {
      this.handleWithRouter(target.pathname)
      ev.preventDefault()
    }

    if (target.dataset.action && target.dataset.action === 'expand') {
      this.toggleContent()
    }
  }

  toggleContent() {
    !this.state.expanded
      ? this.setState({expanded: 'auto'})
      : this.setState({expanded: 0})
  }

  handleWithRouter(target) {
    this.props.router.push(target)
  }

  render() {
    const {size, more} = this.props
    var wysClass;

    if (!this.content)
      return false

    const compName = 'wysiwyg'
    wysClass = compName
    size && (wysClass += ' -' + size)

    return (
      <div className={wysClass} onClick={this.handleClick}>
        {this.content.excerpt && <div className={css.excerpt}>
          <div dangerouslySetInnerHTML={{
            __html: this.content.excerpt
          }}/>
          <button data-action="expand" className={css.btn + ' -link'}>{globals.readMore}</button>
        </div>
}
        {this.content.excerpt
          ? <AnimateHeight className={css.content} duration={200} height={this.state.expanded}><div dangerouslySetInnerHTML={{
              __html: this.content.content
            }}/></AnimateHeight>
          : <div dangerouslySetInnerHTML={{
            __html: this.content.content
          }}/>}
        {more && <Link to={more} className={css.more}>{globals.readMore}</Link>}
      </div>
    )
  }
}

export default withRouter(Wysiwyg)
