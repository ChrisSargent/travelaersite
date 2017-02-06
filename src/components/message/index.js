import React, {Component} from 'react'
import {connect} from 'react-redux'
import {resetMessages} from '../../actions/comments'
import {getMessages} from '../../reducers/messages'
import css from '../../lib/css'
import './_message.sass'

class Message extends Component {
  constructor() {
    super()
    this.handleClose = this.handleClose.bind(this)
  }

  componentWillUnMount() {
    this.props.resetMessages()
  }

  handleClose() {
    this.props.resetMessages()
  }

  render() {
    const {content, type, error} = this.props.messages
    if (!content)
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
        break
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

const mapStateToProps = (state) => ({messages: getMessages(state)})
const mapDispatchToProps = (dispatch) => ({
  resetMessages() {
    dispatch(resetMessages())
  }
})
export default connect(mapStateToProps, mapDispatchToProps)(Message)
