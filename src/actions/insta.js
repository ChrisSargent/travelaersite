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
      clientId: '750929a34d4444efa218b1a525bfebe8',
      accessToken: '15899833.750929a.816ba92fa6024302a2f69175cf6a3572',
      userId: user.instUserNameID,
      resolution: 'standard_resolution',
      limit: 6,
      success: _getInstaSuccess,
      mock: true
    })
    return dispatch(_getInsta(feed))
  } else {
    return null
  }
}
