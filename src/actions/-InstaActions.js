import axios from 'axios';
import dispatcher from '../dispatcher';


// TODO: Receiving an error using Axios - using Instafeed for now, debug later maybe.
export function fetchInsta(user) {
  axios.get('https://api.instagram.com/v1/users/15899833/media/recent?access_token=15899833.1677ed0.c9528e87f021447780fb14e46dd65669&count=8&callback=_onSuccess').then(function(response) {
    console.log('Axios: ', response);
  }).catch(function(error) {
    dispatcher.dispatch({type: 'ERROR_INSTA'});
    console.log(error.message);
  });
}

function _onSuccess(response) {
  console.log('Response:', response);
  dispatcher.dispatch({type: 'RECEIVE_INSTA', insta: response.data});
}
