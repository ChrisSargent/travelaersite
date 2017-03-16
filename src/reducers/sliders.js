import types from '../actions'

export const getActiveIndex = ({sliders}, id) => {
  if (!sliders[id])
    return null
  return sliders[id].activeIndex
}

const sliders = (state = {
}, action) => {

  switch (action.type) {
    case types.REGISTER_SLIDER:
      return {
        ...state,
        [action.payload.id]: {
          activeIndex: 0
        }
      }

    case types.UPDATE_SLIDE_INDEX:
      return {
        ...state,
        [action.payload.id]: {
          activeIndex: action.payload.index
        }
      }

    default:
      break
  }

  return state
}

export default sliders
