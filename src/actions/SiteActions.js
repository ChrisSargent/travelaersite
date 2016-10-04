import axios from 'axios';
import dispatcher from '../dispatcher';

export function fetchSite() {
  dispatcher.dispatch({type: 'FETCH_SITE'});
  axios.get('http://travelaersite.dev/wordpress/wp-json/').then(function(response) {
    setTimeout(function() {
      console.log(response);
      dispatcher.dispatch({type: 'RECEIVE_SITE', site: response.data});
    }, 0);
  }).catch(function(error) {
    console.log(error);
  });
}
