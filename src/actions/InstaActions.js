import Instafeed from 'instafeed.js'
import store from '../store'

const _onSuccess = (response) => {
  store.dispatch({
    type: 'FETCH_INSTA_FULFILLED',
    payload: response.data
  })
}

export const fetchInsta = (user) => {
  const feed = new Instafeed({
    get: 'user',
    tagName: 'travelaer',
    userId: user.instUserNameID,
    accessToken: user.instAuthToken,
    resolution: 'standard_resolution',
    limit: 6,
    success: _onSuccess,
    mock: true,
  });
  feed.run();
  return {
    type: 'FETCH_INSTA_PENDING',
    // payload: feed.run()
  }
}
