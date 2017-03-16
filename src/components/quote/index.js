import React, {PureComponent} from 'react'
import css from '../../lib/css'
import './_quote.sass'

class Quote extends PureComponent {

  render() {
    var classModifier = ''
    const {name, content, job_title, company, modifier} = this.props
    const compName = 'quote'

    classModifier = compName
    modifier && (classModifier += ' -' + modifier)

    return (
      <blockquote className={css.main + classModifier}>
        <span className="wysiwyg" dangerouslySetInnerHTML={{__html: content}}></span>
        <footer className={css.footer + compName}>
          <cite>
            {name && <span className="fn">{name}</span>}
            {job_title && <span className="pos">{job_title}</span>}
            {company && <span className="co">{company}</span>}
          </cite>
        </footer>
      </blockquote>
    )
  }
}

export default Quote
