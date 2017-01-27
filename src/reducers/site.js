export const getOptions = ({site}) => {
  return site.options
}

export const getMenu = ({site}) => {
  return site.menu
}

const site = (state = {
  options: null,
  menu: null,
}, action)  =>{

  switch (action.type) {
    case 'FETCH_OPTIONS_FULFILLED':
      return {
        ...state,
        options: action.payload.data.acf
      }

    case 'FETCH_MENU_FULFILLED':
      return {
        ...state,
        menu: action.payload.data
      }

    default:
      break
  }

  return state
}

export default site
