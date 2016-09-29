import axios from 'axios';
import dispatcher from '../../dispatcher';

export function fetchOptions() {
  dispatcher.dispatch({type: 'FETCH_OPTIONS'});
  axios.get('http://travelaersite.dev/wordpress/wp-json/acf/v2/options	').then(function(response) {
    setTimeout(function() {
      dispatcher.dispatch({type: 'RECEIVE_OPTIONS', options: response.data.acf});
    }, 0);
  }).catch(function(error) {
    console.log(error);
  });
}
