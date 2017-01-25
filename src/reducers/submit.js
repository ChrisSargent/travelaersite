const submit = (state = {
  showLoader: false,
  submitted: false,
  name: '',
  email: '',
  comment: '',
}, action) => {

  switch (action.type) {
    case 'POST_COMMENT_PENDING':
      return {
        ...state,
        showLoader: true,
      }

    case 'POST_COMMENT_FULFILLED':
      return {
        ...state,
        showLoader: false,
        submitted: true,
        comment: '',
      }

    case 'POST_COMMENT_REJECTED':
      return {
        ...state,
        showLoader: false
      }

    case 'COMMENT_CACHE':
      const {name, comment, email} = action.payload
      return {
        ...state,
        name: name,
        comment: comment,
        email: email,
      }

    default:
      break
  }
  return state
}

export default submit
