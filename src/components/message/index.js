import React, {Component} from 'react'
import {connect} from 'react-redux'
import css from '../../lib/css'
import {resetMessages} from '../../actions/CommentsActions'

import './_message.sass'

class Message extends Component {
  constructor() {
    super()
    this.handleClose = this.handleClose.bind(this)
  }

  componentWillMount() {
    this.props.resetMessages()
  }

  handleClose() {
    this.props.resetMessages()
  }

  render() {
    const {content, type, error} = this.props.messages
    if(!content)
      return null

    const compName = 'message'
    var compClass = css.main + compName

    switch (type) {
      case 'error':
        compClass += css.error
        break
      case 'warning':
        compClass += css.warning
        break
      case 'success':
        compClass += css.success
        break
      default:

    }

    return (
      <div className={compClass}>
        {content}
        {error && <span className="error" dangerouslySetInnerHTML={{__html: error}}></span>}
        <span className="close" onClick={this.handleClose}>
          <span>Close</span>
        </span>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {messages: state.messages}
}

const mapDispatchToProps = (dispatch) => {
  return {
    resetMessages: () => {
      dispatch(resetMessages())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Message)
