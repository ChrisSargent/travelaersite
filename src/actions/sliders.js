import types from '.'

// *****************************************************************************
// ******************************* SITE ACTIONS ********************************
// *****************************************************************************

export const registerSlider = (id) => {
  return {
    type: types.REGISTER_SLIDER,
    payload: {id}
  }
}

export const updateSlideIndex = (id, index) => {
  return {
    type: types.UPDATE_SLIDE_INDEX,
    payload: {id, index}
  }
}
