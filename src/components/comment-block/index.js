import React, {Component} from 'react';
import ArticleHeader from '../article-header';
import CommentForm from '../comment-form';
import CommentList from '../comment-list';
import SubmitStore from '../../stores/SubmitStore';
import Section from '../section';

require('./_comment-block.sass');

export default class CommentBlock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      replyCommentID: false
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
    const reset = SubmitStore.shouldResetForm();
    !reset && this.setState({replyCommentID: false});
  }

  handleClick(ev) {
    const replyOn = ev.target.dataset.actionparam;
    switch (replyOn) {
      case 'close':
        this.setState({replyCommentID: false});
        break;

      case undefined:
        // Do nothing
        break

      default:
        this.setState({replyCommentID: ev.target.dataset.actionparam});
    }
  }

  render() {
    var titleText;
    const {total, comments} = this.props.commentsInfo;
    const {postTitle, postID} = this.props;
    const {replyCommentID} = this.state;
    const compName = 'comments';

    total > 0
      ? titleText = total + '\u00A0Responses'
      : titleText = 'Be the first to respond ';

    titleText += ' to \u0022' + postTitle + '\u0022'

    return (
      <Section compName={compName}>
        <div onClick={this.handleClick}>
          <ArticleHeader title={titleText} modifier={compName}/>
          <CommentList comments={comments} postID={postID} replyCommentID={replyCommentID} />
          {!replyCommentID && <CommentForm postID={postID} parentCommentID="0" />}
        </div>
      </Section>
    );
  }
};
