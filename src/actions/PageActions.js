import axios from 'axios';
import dispatcher from '../dispatcher';
import globals from '../lib/globals'

export function fetchPage(slug) {
  slug = slug || 'home';
  dispatcher.dispatch({type: 'FETCH_PAGE'});
  axios.get(globals.jsonUrl + '/wp/v2/pages/', {
    params: {
      slug: slug
    }
  }).then(function(response) {
    // Just in a timeout to simulate network latency in dev
    setTimeout(function() {
      dispatcher.dispatch({type: 'RECEIVE_PAGE', page: response.data});
    }, 0);
  }).catch(function(error) {
    console.log(error);
  });
}
