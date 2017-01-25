const insta = (state = {
  lastFetched: false,
  feed: []
}, action) => {
  switch (action.type) {
    case 'FETCH_INSTA_FULFILLED':
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
