import types from '../actions'

export const getInsta = ({insta}) => {
  return insta.feed
}

const insta = (state = {
  lastFetched: false,
  feed: false
}, action) => {
  switch (action.type) {
    case types.FETCH_INSTA + '_FULFILLED':
      return {
        ...state,
        feed: action.payload,
        lastFetched: Date.now()
      }

    default:
      break
  }

  return state
}

export default insta
