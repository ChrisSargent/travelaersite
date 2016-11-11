import axios from 'axios';
import dispatcher from '../dispatcher';
import globals from '../lib/globals'

export function fetchOptions() {
  dispatcher.dispatch({type: 'FETCH_OPTIONS'});
  // Just in a timeout to simulate network latency in dev
  axios.get(globals.jsonUrl + '/acf/v2/options	').then(function(response) {
    setTimeout(function() {
      dispatcher.dispatch({type: 'RECEIVE_OPTIONS', options: response.data.acf});
    }, 0);
  }).catch(function(error) {
    console.log(error);
  });
}
