import types from '../actions'

export const getSubmitted = ({submit}) => {
  return submit.submitted
}

export const getSubmit = ({submit}) => {
  return submit
}

const submit = (state = {
  showLoader: false,
  submitted: false,
  name: '',
  email: '',
  comment: '',
}, action) => {

  switch (action.type) {
    case types.POST_COMMENT + '_PENDING':
      return {
        ...state,
        showLoader: true,
      }

    case types.POST_COMMENT + '_FULFILLED':
      return {
        ...state,
        showLoader: false,
        submitted: true,
        comment: '',
      }

    case types.POST_COMMENT + '_REJECTED':
      return {
        ...state,
        showLoader: false
      }

    case types.CACHE_COMMENT:
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
