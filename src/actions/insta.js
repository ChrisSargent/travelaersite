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
  const feed = new Instafeed({
    get: 'user',
    // tagName: 'travelaer',
    clientId: '750929a34d4444efa218b1a525bfebe8',
    accessToken: '15899833.750929a.816ba92fa6024302a2f69175cf6a3572',
    userId: user.instUserNameID,
    resolution: 'standard_resolution',
    limit: 6,
    success: (response) => {
      dispatch(_getInstaSuccess(response))
    },
    mock: true
  })
  return dispatch(_getInsta(feed))
}
