import React, {Component} from 'react';
import css from '../../lib/css';
import dateFormat from '../../lib/date.js'

import Actions from '../actions';
import ArticleHeader from '../article-header';
import Avatar from '../avatar';
import CommentForm from '../comment-form';
import Wysiwyg from '../wysiwyg';

require('./_comments.sass');

function Comment(props) {
  const {comment_ID, comment_author, comment_content, comment_date_gmt, comment_post_ID} = props.comment;
  const {ui} = props;
  const dateString = dateFormat(comment_date_gmt, true);
  const actions = [
    {
      linkTitle: 'Reply',
      onClick: ui.replyClick,
      param: comment_ID
    }
  ];

  return (
    <div className="article-comment">
      <Avatar avatar="" modifier="comment" alt={comment_author}/>
      <div className="content-comment">
        <ArticleHeader title={comment_author} subtitle={dateString} modifier="comment"/>
        <Wysiwyg content={comment_content} modifier="comment"/>
        <Actions actions={actions} modifier="clear"/>
        {ui.focusedComment === comment_ID && <CommentForm parent={comment_ID} post={comment_post_ID} closeClick={ui.replyClick}/>}
      </div>
    </div>
  );
}

function CommentList(props) {
  const {comments, ui} = props;
  const commentsMap = comments.map((comment) => {
    return (
      <li key={comment.comment_ID} className="item">
        <Comment comment={comment} ui={ui}/>
        {comment.comment_replies && <CommentList comments={comment.comment_replies} ui={ui}/>}
      </li>
    );
  });

  return (
    <ol className="comment-list">
      {commentsMap}
    </ol>
  );
}

export default class CommentBlock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      focusedComment: false
    };
    this.handleClick = this.handleClick.bind(this);
  };

  handleClick(ev) {
    ev.preventDefault();
    if (!ev.target.dataset.actionparam) {
      this.setState({focusedComment: false});
    } else {
      this.setState({focusedComment: ev.target.dataset.actionparam});
    }
  }

  render() {
    var titleText;
    const {total, comments} = this.props.commentsInfo;
    const {title, post} = this.props;
    const ui = {
      replyClick: this.handleClick,
      focusedComment: this.state.focusedComment
    }

    total > 0
      ? titleText = total + '\u00A0Responses'
      : titleText = 'Be the first to respond ';

    return (
      <section className="comments-section">
        <h1 className={css.title}>{titleText} to "{title}"</h1>
        {total > 0 && <CommentList comments={comments} ui={ui}/>}
        {!ui.focusedComment && <CommentForm post={post}/>}
      </section>
    );
  }
};