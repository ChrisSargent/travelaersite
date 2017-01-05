import React, {Component} from 'react';
import ArticleHeader from '../article-header';
import Submit from '../submit';
import CommentList from '../comment-list';
import Message from '../message';
import * as SiteActions from '../../actions/SiteActions';
import SubmitStore from '../../stores/SubmitStore';
import Section from '../section';

import './_comments.sass';

export default class Comments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      replyCommentID: false,
      messageCommentID: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  };

  componentWillMount() {
    SubmitStore.on('change', this.handleChange);
  }

  componentWillUnmount() {
    SubmitStore.removeListener('change', this.handleChange);
  }

  handleChange() {
    const target = this.state.replyCommentID;
    const submitted = SubmitStore.getSubmitted();

    if(submitted) {
      this.setState({replyCommentID: false});
    } else {
      this.setState({messageCommentID: target});
    }
  }

  handleClick(ev) {
    const replyOn = ev.target.dataset.actionparam;

    switch (replyOn) {
      case 'close':
        SiteActions.resetMessages();
        this.replyOn = replyOn;
        this.setState({replyCommentID: false, messageCommentID: false});
        break;

      case undefined:
        // Do nothing
        break;

      default:
        SiteActions.resetMessages();
        this.replyOn = replyOn;
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
          <CommentList comments={comments} postID={postID} replyCommentID={replyCommentID} messageCommentID={messageCommentID} compName={compName}/>
          {!messageCommentID && <Message reset={resetMessage} />}
          {!replyCommentID && <Submit postType="comments" postID={postID} parentCommentID="0" />}
        </div>
      </Section>
    );
  }
};
