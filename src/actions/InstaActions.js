import Instafeed from 'instafeed.js'
import dispatcher from '../dispatcher';

export function fetchInsta(user) {
  const feed = new Instafeed({
    get: 'user',
    tagName: 'travelaer',
    userId: user.id,
    accessToken: user.auth,
    resolution: 'standard_resolution',
    limit: 6,
    success: _onSuccess,
    mock: true,
  });
  feed.run();
}

function _onSuccess(response) {
  // console.log('Response:', response);
  dispatcher.dispatch({type: 'RECEIVE_INSTA', insta: response.data});
}
