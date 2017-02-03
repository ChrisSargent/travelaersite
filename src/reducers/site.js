import types from '../actions'
import {stripDomain} from '../lib/utils'

export const getOptions = ({site}) => {
  return site.options
}

export const getMenu = ({site}) => {
  return site.menu
}

export const getHasSubMenu = ({site}, pathname) => {
  const path = '/' + pathname.split('/', 2)[1]
  return site.routesWithSubMenu.includes(path)
}

const routesWithSubMenu = (menu) => {
  return menu.filter((item) => {
    return item.children.length
  }).map((item) => {
    return stripDomain(item.url)
  })
}

const site = (state = {
  options: null,
  menu: null,
  routesWithSubMenu: [],
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
        routesWithSubMenu: routesWithSubMenu(menu)
      }

    default:
      break
  }

  return state
}

export default site
