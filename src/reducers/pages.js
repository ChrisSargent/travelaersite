export const getPage = ({pages}) => {
  return pages[pages.currentPageSlug]
}

const pages = (state = {
  currentPageSlug: null
}, action) => {

  switch (action.type) {
    case 'UPDATE_CURRENT_PAGE':
      return {
        ...state,
        currentPageSlug: action.payload
      }

    case 'FETCH_PAGE_FULFILLED':
      const page = action.payload.data[0]
      return {
        ...state,
        [page.slug]: page,
        currentPageSlug: page.slug
      }

    default:
      break
  }

  return state
}

export default pages
