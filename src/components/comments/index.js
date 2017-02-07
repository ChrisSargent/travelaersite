import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getSubmitted} from '../../reducers/submit'
import ArticleHeader from '../article-header'
import CommentList from '../comment-list'
import Submit from '../submit'
import Message from '../message'
import Section from '../../sections/section'
import './_comments.sass'

class Comments extends Component {
  constructor(props) {
    super(props)
    // Which reply has the comment on and which has the message on,
    this.state = {
      replyCommentID: this.props.submitted,
      messageCommentID: false
    }
    this.handleClick = this.handleClick.bind(this)
  }

  componentWillReceiveProps(newProps) {
    // Puts the form back to the bottom of the page if it is submitted successfully
    newProps.submitted && this.setState({replyCommentID: false})
  }

  handleClick(ev) {
    const replyOn = ev.target.dataset.actionparam

    switch (replyOn) {
      case 'close':
        this.setState({replyCommentID: false, messageCommentID: false})
        break

      case undefined:
        // Do nothing
        break

      default:
        this.setState({replyCommentID: replyOn, messageCommentID: replyOn})
    }
  }

  render() {
    var titleText
    const {total, comments} = this.props.commentsInfo
    const {postTitle, postID} = this.props
    const {replyCommentID, messageCommentID} = this.state
    const compName = 'comments'

    total > 0
      ? titleText = total + '\u00A0Responses'
      : titleText = 'Be the first to respond '

    titleText += ' to \u0022' + postTitle + '\u0022'

    return (
      <Section compName={compName}>
        <div onClick={this.handleClick}>
          <ArticleHeader title={titleText} compName={compName}/>
          <CommentList comments={comments} postID={postID} replyCommentID={replyCommentID} messageCommentID={messageCommentID} compName={compName}/>
          {!messageCommentID && <Message/>}
          {!replyCommentID && <Submit postType="comments" postID={postID} parentCommentID="0"/>}
        </div>
      </Section>
    )
  }
}

const mapStateToProps = (state) => ({submitted: getSubmitted(state)})
export default connect(mapStateToProps)(Comments)
