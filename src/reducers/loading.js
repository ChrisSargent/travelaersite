import types from '../actions'

export const getLoading = ({loading}) => {
  return loading.length
}

const loading = (state = [], action) => {

  switch (action.type) {
    case types.FETCH_OPTIONS + '_PENDING':
    case types.FETCH_MENU + '_PENDING':
    case types.FETCH_PAGE + '_PENDING':
    case types.FETCH_CURRENT_POST + '_PENDING':
    case types.FETCH_LATEST_POSTS + '_PENDING':
      return [...state, action.meta.id]

    case types.FETCH_OPTIONS + '_FULFILLED':
    case types.FETCH_MENU + '_FULFILLED':
    case types.FETCH_PAGE + '_FULFILLED':
    case types.FETCH_CURRENT_POST + '_FULFILLED':
    case types.FETCH_LATEST_POSTS + '_FULFILLED':
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
