export default function reducer(pages = {
  currentPageSlug: null
}, action) {

  switch (action.type) {
    case 'UPDATE_CURRENT_PAGE':
      console.log(pages);
      return {
        ...pages,
        currentPageSlug: action.payload
      }

    case 'FETCH_PAGE_FULFILLED':
      const page = action.payload.data[0]
      return {
        ...pages,
        [page.slug]: page,
        currentPageSlug: page.slug
      }

    default:
      break
  }

  return pages
}
