export const getLoading = (state) => {
  return state.loading.length
}

const loading = (state = [], action) => {

  switch (action.type) {
    case 'FETCH_OPTIONS_PENDING':
    case 'FETCH_MENU_PENDING':
    case 'FETCH_PAGE_PENDING':
    case 'FETCH_CURRENT_POST_PENDING':
    case 'FETCH_LATEST_POSTS_PENDING':
      return [...state, action.meta.id]

    case 'FETCH_OPTIONS_FULFILLED':
    case 'FETCH_MENU_FULFILLED':
    case 'FETCH_PAGE_FULFILLED':
    case 'FETCH_CURRENT_POST_FULFILLED':
    case 'FETCH_LATEST_POSTS_FULFILLED':
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
