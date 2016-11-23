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
  const {interact} = props;
  const dateString = dateFormat(comment_date_gmt, true);
  const actions = [
    {
      linkTitle: 'Reply',
      onClick: interact.replyClick,
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
        {interact.focusedComment === comment_ID && <CommentForm parent={comment_ID} post={comment_post_ID} close={interact.replyClick} />}
      </div>
    </div>
  );
}

function Comments(props) {
  const {comments, interact} = props;
  const commentsMap = comments.map((comment) => {
    return (
      <li key={comment.comment_ID} className="item">
        <Comment comment={comment} interact={interact}/>
        {comment.comment_replies && <Comments comments={comment.comment_replies} interact={interact} />}
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
      focusedComment: false,
    };
    this.handleFocus = this.handleFocus.bind(this);
  };

  handleFocus(id, e) {
    e.preventDefault();
    this.setState({focusedComment: id});
  }

  render() {
    var interact, titleText;
    const {total, comments} = this.props.commentsInfo;
    const {title, post} = this.props;

    interact = {
      replyClick: this.handleFocus,
      focusedComment: this.state.focusedComment,
    }

    total > 0 ? titleText = total + '&nbsp;Responses' : titleText = 'Be the first to respond ' ;

    return (
      <section className="comments-section">
        <h1 className={css.title}>{titleText} to "{title}"</h1>
        {total > 0 && <Comments comments={comments} interact={interact} /> }
        {!interact.focusedComment && <CommentForm post={post} />}
      </section>
    );
  }
};
