import Instafeed from 'instafeed.js'
import types from '.'

const _getInstaSuccess = (response) => ({
  type: types.FETCH_INSTA + '_FULFILLED',
  payload: response.data
})

const _getInsta = (feed) => ({
  type: types.FETCH_INSTA + '_PENDING',
  payload: feed.run()
})

export const fetchInsta = (user) => (dispatch, getState) => {
  const {lastFetched} = getState().insta
  const nextUpdate = lastFetched + 1800000

  if (nextUpdate > Date.now())
    return null

  const feed = new Instafeed({
    userId: user.instUserNameID,
    accessToken: user.instAuthToken,
    get: 'user',
    resolution: 'standard_resolution',
    limit: 6,
    success: (response) => {
      dispatch(_getInstaSuccess(response))
    },
    mock: true
  })
  return dispatch(_getInsta(feed))
}
