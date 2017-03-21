import types from '../actions'

export const getMessages = ({messages}) => {
  return messages
}

const messages = (state = {
  content: '',
  type: '',
  error: ''
}, action) => {
  var messages
  switch (action.type) {
    case types.POST_COMMENT + '_FULFILLED':
      var content
      messages = action.meta.messages
      action.payload.data.status === 'hold'
        ? content = messages.successHold
        : content = messages.success

      return {
        ...state,
        content,
        type: 'success'
      }

    case types.POST_COMMENT + '_REJECTED':
      const {message} = action.payload.response.data
      messages = action.meta.messages
      return {
        ...state,
        content: messages.error,
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
