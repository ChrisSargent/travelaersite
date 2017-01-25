export default function reducer(site = {
  options: null,
  menu: null,
}, action) {

  switch (action.type) {
    case 'FETCH_OPTIONS_FULFILLED':
      return {
        ...site,
        options: action.payload.data.acf
      }

    case 'FETCH_MENU_FULFILLED':
      return {
        ...site,
        menu: action.payload.data
      }

    default:
      break
  }

  return site
}
