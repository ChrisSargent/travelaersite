import axios from 'axios';
import dispatcher from '../dispatcher';
import globals from '../lib/globals'

export function fetchSite() {
  dispatcher.dispatch({type: 'FETCH_SITE'});
  axios.get(globals.jsonUrl).then(function(response) {
    // Just in a timeout to simulate network latency in dev
    setTimeout(function() {
      dispatcher.dispatch({type: 'RECEIVE_SITE', site: response.data});
    }, 0);
  }).catch(function(error) {
    console.log(error);
  });
}
