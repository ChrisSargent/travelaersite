import axios from 'axios';
import dispatcher from '../dispatcher';

export function fetchMosaic() {
  dispatcher.dispatch({type: 'FETCH_MOSAIC'});
  axios.get('/wp/v2/tiles/').then(function(response) {
    dispatcher.dispatch({type: 'RECEIVE_MOSAIC', mosaic: response.data});
  }).catch(function(error) {
    console.log(error);
  });
}
