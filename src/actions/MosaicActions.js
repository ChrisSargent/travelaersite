import axios from 'axios';
import dispatcher from '../dispatcher';

export function fetchMosaic() {
  dispatcher.dispatch({type: 'FETCH_MOSAIC'});
  axios.get('http://travelaersite.dev/wordpress/wp-json/wp/v2/tiles/').then(function(response) {
    setTimeout(function() {
      dispatcher.dispatch({type: 'RECEIVE_MOSAIC', mosaic: response.data});
    }, 0);
  }).catch(function(error) {
    console.log(error);
  });
}
