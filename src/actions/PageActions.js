import axios from 'axios';
import dispatcher from '../dispatcher';

export function fetchPage(slug) {
  slug = slug || 'home';
  dispatcher.dispatch({type: 'FETCH_PAGE'});
  dispatcher.dispatch({type: 'LOADING', id: 'fetchPage'});
  axios.get('/wp/v2/pages/', {
    params: {
      slug: slug
    }
  }).then(function(response) {
    dispatcher.dispatch({type: 'RECEIVE_PAGE', page: response.data});
    dispatcher.dispatch({type: 'FINISHED_LOADING', id: 'fetchPage'});
    // console.log(response.data);
  }).catch(function(error) {
    console.log(error);
  });
}
