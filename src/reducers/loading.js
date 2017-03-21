import types from '../actions'

export const getLoading = ({loading}) => {
  return loading.length
}

const loading = (state = true, action) => {

  switch (action.type) {
    case types.FETCH_OPTIONS + '_PENDING':
    case types.FETCH_MENU + '_PENDING':
    case types.FETCH_PAGE + '_PENDING':
    case types.FETCH_SINGLE_POST + '_PENDING':
    case types.FETCH_POSTS + '_PENDING':
      return [...state, action.meta.id]

    case types.FETCH_OPTIONS + '_FULFILLED':
    case types.FETCH_MENU + '_FULFILLED':
    case types.FETCH_PAGE + '_FULFILLED':
    case types.FETCH_SINGLE_POST + '_FULFILLED':
    case types.FETCH_POSTS + '_FULFILLED':
      const index = state.indexOf(action.meta.id)
      return [
        ...state.slice(0, index),
        ...state.slice(index + 1)
      ]

    default:
      break
  }

  return state
}

export default loading
