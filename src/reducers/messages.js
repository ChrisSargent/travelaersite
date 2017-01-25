const messages = (state = {
  content: '',
  type: '',
  error: ''
}, action) => {
  switch (action.type) {
    case 'POST_COMMENT_FULFILLED':
      var content

      action.payload.data.status === 'hold'
        ? content = 'Thanks! Your comment has been submitted and is awaiting approval.'
        : content = 'Thanks! Your comment has been approved and added.'

      return {
        ...state,
        content: content,
        type: 'success'
      }

    // If requested, also update the comments
    // updateComments && PostsActions.fetchPost(response.data.post);

    case 'POST_COMMENT_REJECTED':
      const {message} = action.payload.response.data
      return {
        ...state,
        content: 'Sorry, there was a problem with your comment and it was not submitted. The error was: ',
        type: 'error',
        error: message
      }

    case 'RESET_MESSAGE':
      return {
        ...state,
        content: '',
        type: '',
        error: ''
      }

    default:
      break
  }

  return state
}

export default messages
