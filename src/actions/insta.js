import Instafeed from 'instafeed.js'
import store from '../store'
import types from '.'

const _getInstaSuccess = (response) => {
  store.dispatch({type: types.FETCH_INSTA + '_FULFILLED', payload: response.data})
}

const _getInsta = (feed) => ({type: types.FETCH_INSTA + '_PENDING', payload: feed.run()})

export const fetchInsta = (user) => (dispatch, getState) => {
  const {lastFetched} = getState().insta
  const nextUpdate = lastFetched + 1800000

  if (!lastFetched || nextUpdate < Date.now()) {
    const feed = new Instafeed({
      get: 'user',
      // tagName: 'travelaer',
      userId: user.instUserNameID,
      accessToken: user.instAuthToken,
      // resolution: 'standard_resolution',
      limit: 6,
      success: _getInstaSuccess,
      mock: true
    })
    return dispatch(_getInsta(feed))
  } else {
    return null
  }
}
