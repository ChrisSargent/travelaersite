import React, {Component} from 'react';
import ArticleHeader from '../article-header';
import Submit from '../submit';
import CommentList from '../comment-list';
import Message from '../message';
import * as MessageActions from '../../actions/MessageActions';
import SubmitStore from '../../stores/SubmitStore';
import Section from '../section';

require('./_comment-block.sass');

export default class CommentBlock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      replyCommentID: false,
      messageCommentID: false,
    };
    this.resetFormPosition = this.resetFormPosition.bind(this);
    this.handleClick = this.handleClick.bind(this);
  };

  componentWillMount() {
    SubmitStore.on('change', this.resetFormPosition);
  }

  componentWillUnmount() {
    SubmitStore.removeListener('change', this.resetFormPosition);
  }

  resetFormPosition() {
    const submitted = SubmitStore.getSubmitted();
    submitted && this.setState({replyCommentID: false});
  }

  handleClick(ev) {
    const replyOn = ev.target.dataset.actionparam;
    switch (replyOn) {
      case 'close':
        MessageActions.resetMessages();
        this.setState({replyCommentID: false, messageCommentID: false});
        break;

      case undefined:
        // Do nothing
        break;

      default:
        MessageActions.resetMessages();
        this.setState({replyCommentID: replyOn, messageCommentID: replyOn});
    }
  }

  render() {
    var titleText;
    const {total, comments} = this.props.commentsInfo;
    const {postTitle, postID} = this.props;
    const {replyCommentID, messageCommentID, resetMessage} = this.state;
    const compName = 'comments';

    total > 0
      ? titleText = total + '\u00A0Responses'
      : titleText = 'Be the first to respond ';

    titleText += ' to \u0022' + postTitle + '\u0022'

    return (
      <Section compName={compName}>
        <div onClick={this.handleClick}>
          <ArticleHeader title={titleText} modifier={compName}/>
          <CommentList comments={comments} postID={postID} replyCommentID={replyCommentID} messageCommentID={messageCommentID} />
          {!messageCommentID && <Message reset={resetMessage} />}
          {!replyCommentID && <Submit postType="comments" postID={postID} parentCommentID="0" />}
        </div>
      </Section>
    );
  }
};
