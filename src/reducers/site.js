import types from '../actions'

export const getOptions = ({site}) => {
  return site.options
}

export const getMenu = ({site}) => {
  return site.menu
}

const site = (state = {
  options: null,
  menu: null,
}, action) => {

  switch (action.type) {
    case types.FETCH_OPTIONS + '_FULFILLED':
      return {
        ...state,
        options: action.payload.data.acf
      }

    case types.FETCH_MENU + '_FULFILLED':
      const menu = action.payload.data
      return {
        ...state,
        menu,
      }

    default:
      break
  }

  return state
}

export default site
