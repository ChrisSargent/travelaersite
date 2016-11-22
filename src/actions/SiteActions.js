import axios from 'axios';
import dispatcher from '../dispatcher';

export function fetchSite() {
  dispatcher.dispatch({type: 'FETCH_SITE'});
  axios.get('').then(function(response) {
    dispatcher.dispatch({type: 'RECEIVE_SITE', site: response.data});
  }).catch(function(error) {
    console.log(error);
  });
}
