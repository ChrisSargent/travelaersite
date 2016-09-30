import axios from 'axios';
import dispatcher from '../dispatcher';

export function fetchPage(pageID) {
  dispatcher.dispatch({type: 'FETCH_PAGE'});
  axios.get('http://travelaersite.dev/wordpress/wp-json/wp/v2/pages/' + pageID).then(function(response) {
    setTimeout(function() {
      dispatcher.dispatch({type: 'RECEIVE_PAGE', page: response.data});
    }, 0);
  }).catch(function(error) {
    console.log(error);
  });
}
