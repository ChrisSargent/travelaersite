import axios from 'axios';
import dispatcher from '../dispatcher';

export function fetchPosts(slug) {
  slug = slug || '';
  dispatcher.dispatch({type: 'FETCH_POSTS'});
  axios.get('/wp/v2/posts/', {
    params: {
      'filter[name]': slug,
      '_embed': 'true'
    }
  }).then(function(response) {
    dispatcher.dispatch({type: 'RECEIVE_POSTS', posts: response.data});
    // console.log(response.data);
  }).catch(function(error) {
    console.log(error);
  });
}
