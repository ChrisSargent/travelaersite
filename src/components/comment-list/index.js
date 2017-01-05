import React from 'react';
import css from '../../lib/css';
import dateFormat from '../../lib/date'

import Actions from '../actions';
import ArticleHeader from '../article-header';
import Submit from '../submit';
import Message from '../message';
import RespImageCover from '../resp-image-cover';
import Wysiwyg from '../wysiwyg';

import './_comment-list.sass';

function Comment(props) {
  const {
    comment_ID,
    comment_author,
    comment_content,
    comment_date_gmt,
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
    <div className={css.main + compName}>
      <RespImageCover avatar image={comment_author_avatar} alt={comment_author}/>
      <div className={css.article + compName}>
        <ArticleHeader title={comment_author} subtitle={dateString} modifier={compName}/>
        <Wysiwyg content={comment_content}/>
        <Actions actions={actions} />
      </div>
    </div>
  );
}

function CommentList(props) {
  const {comments} = props;
  const {postID, replyCommentID, messageCommentID, compName} = props;

  if(!comments)
    return null;

  const commentsMap = comments.map((comment) => {
    const {comment_ID, comment_replies} = comment;
    return (
      <li key={comment_ID} className={css.item}>
        <Comment comment={comment} />
        {messageCommentID === comment_ID && <Message />}
        {replyCommentID === comment_ID && <Submit postType="comments" postID={postID} parentCommentID={comment_ID} />}
        {comment_replies && <CommentList {...props} comments={comment_replies} />}
      </li>
    );
  });

  return (
    <ol className={css.list + compName}>
      {commentsMap}
    </ol>
  );
}

export default CommentList;
