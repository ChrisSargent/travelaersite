import React from 'react'
import {dateFormat} from '../../lib/utils'
import Actions from '../actions'
import ArticleHeader from '../article-header'
import css from '../../lib/css'
import Submit from '../submit'
import Message from '../message'
import RespImageCover from '../resp-image-cover'
import Wysiwyg from '../wysiwyg'
import './_comment-list.sass'

const Comment = ({comment_ID, comment_author, comment_content, comment_date_gmt, comment_author_avatar}) => {
  const compName = 'comment'
  const dateString = dateFormat(comment_date_gmt, true)
  const actions = [
    {
      linkTitle: 'Reply',
      param: comment_ID,
      modifier: "clear"
    }
  ]

  return (
    <div className={css.main + compName}>
      <RespImageCover avatar image={comment_author_avatar} alt={comment_author}/>
      <div className={css.article + compName}>
        <ArticleHeader title={comment_author} subtitle={dateString} modifier={compName}/>
        <Wysiwyg content={comment_content}/>
        <Actions actions={actions}/>
      </div>
    </div>
  )
}

const CommentList = (props) => {
  const {postID, replyCommentID, messageCommentID, compName, comments} = props

  if (!comments)
    return null

  const commentsMap = comments.map((comment) => {
    const {comment_ID, comment_replies} = comment
    return (
      <li key={comment_ID} className={css.item}>
        <Comment {...comment}/>
        {messageCommentID === comment_ID && <Message/>}
        {replyCommentID === comment_ID && <Submit postType="comments" postID={postID} parentCommentID={comment_ID}/>}
        {comment_replies && <CommentList {...props} comments={comment_replies}/>}
      </li>
    )
  })

  return (
    <ol className={css.list + compName}>
      {commentsMap}
    </ol>
  )
}

export default CommentList
