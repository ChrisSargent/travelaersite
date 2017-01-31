import types from '../actions'

export const getMessages = ({messages}) => {
  return messages
}

const messages = (state = {
  content: '',
  type: '',
  error: ''
}, action) => {
  switch (action.type) {
    case types.POST_COMMENT + '_FULFILLED':
      var content

      action.payload.data.status === 'hold'
        ? content = 'Thanks! Your comment has been submitted and is awaiting approval.'
        : content = 'Thanks! Your comment has been approved and added.'

      return {
        ...state,
        content,
        type: 'success'
      }

    case types.POST_COMMENT + '_REJECTED':
      const {message} = action.payload.response.data
      return {
        ...state,
        content: 'Sorry, there was a problem with your comment and it was not submitted. The error was: ',
        type: 'error',
        error: message
      }

    case types.RESET_MESSAGE:
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
