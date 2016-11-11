import axios from 'axios';
import dispatcher from '../dispatcher';
import globals from '../lib/globals'

export function fetchMosaic() {
  dispatcher.dispatch({type: 'FETCH_MOSAIC'});
  // Just in a timeout to simulate network latency in dev
  axios.get(globals.jsonUrl + '/wp/v2/tiles/').then(function(response) {
    setTimeout(function() {
      dispatcher.dispatch({type: 'RECEIVE_MOSAIC', mosaic: response.data});
    }, 0);
  }).catch(function(error) {
    console.log(error);
  });
}
