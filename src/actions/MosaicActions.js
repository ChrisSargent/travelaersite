import axios from 'axios';
import dispatcher from '../dispatcher';

export function fetchMosaic() {
  dispatcher.dispatch({type: 'FETCH_MOSAIC'});
  dispatcher.dispatch({type: 'LOADING', id: 'fetchMosaic'});
  axios.get('/wp/v2/tiles/').then(function(response) {
    dispatcher.dispatch({type: 'RECEIVE_MOSAIC', mosaic: response.data});
    dispatcher.dispatch({type: 'FINISHED_LOADING', id: 'fetchMosaic'});
  }).catch(function(error) {
    console.log(error);
  });
}
