import React, {Component} from 'react';
import css from '../../lib/css';
import dateFormat from '../../lib/date'

import Actions from '../actions';
import ArticleHeader from '../article-header';
import CommentForm from '../comment-form';
import RespImageCover from '../resp-image-cover';
import Section from '../section';
import Wysiwyg from '../wysiwyg';

require('./_comments.sass');

function Comment(props) {
  const {
    comment_ID,
    comment_author,
    comment_content,
    comment_date_gmt,
    comment_post_ID,
    comment_author_avatar
  } = props.comment;

  const compName = 'comment';
  const dateString = dateFormat(comment_date_gmt, true);
  const actions = [
    {
      linkTitle: 'Reply',
      param: comment_ID,
      modifier: "clear"
    }
  ];

  return (
    <div className={css.article + compName}>
      <RespImageCover className={css.avatar} image={comment_author_avatar} alt={comment_author}/>
      <div className={css.main + compName}>
        <ArticleHeader title={comment_author} subtitle={dateString} modifier={compName}/>
        <Wysiwyg content={comment_content}/>
        <Actions actions={actions} />
      </div>
      {props.replyComment === comment_ID && <CommentForm parent={comment_ID} post={comment_post_ID}/>}
    </div>
  );
}

function CommentList(props) {
  const {comments, replyComment, action} = props;
  if(!comments)
    return null;

  const compName = 'comments';
  const commentsMap = comments.map((comment) => {
    return (
      <li key={comment.comment_ID} className={css.item}>
        <Comment comment={comment} replyComment={replyComment} />
        <CommentList {...props} comments={comment.comment_replies} />
      </li>
    );
  });

  return (
    <ol className={css.list + compName} onClick={action}>
      {commentsMap}
    </ol>
  );
}

export default class CommentBlock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      replyComment: false
    };
    this.handleClick = this.handleClick.bind(this);
  };

  handleClick(ev) {
    const replyOn = ev.target.dataset.actionparam;
    switch (replyOn) {
      case 'close':
        this.setState({replyComment: false});
        break;

      case undefined:
        // Do nothing
        break

      default:
        this.setState({replyComment: ev.target.dataset.actionparam});
    }
  }

  render() {
    var titleText;
    const {total, comments} = this.props.commentsInfo;
    const {title, post} = this.props;
    const compName = 'comments';

    total > 0
      ? titleText = total + '\u00A0Responses'
      : titleText = 'Be the first to respond ';

    titleText += ' to \u0022' + title + '\u0022'

    return (
      <Section compName={compName}>
        <ArticleHeader title={titleText} modifier={compName}/>
        <CommentList comments={comments} replyComment={this.state.replyComment} action={this.handleClick}/>
        {!this.state.replyComment && <CommentForm post={post}/>}
      </Section>
    );
  }
};
