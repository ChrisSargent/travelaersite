import axios from 'axios';
import dispatcher from '../dispatcher';
import globals from '../lib/globals'

export function fetchPosts(slug) {
  slug = slug || '';
  dispatcher.dispatch({type: 'FETCH_POSTS'});
  axios.get(globals.jsonUrl + '/wp/v2/posts/', {
    params: {
      'filter[name]': slug
    }
  }).then(function(response) {
    // Just in a timeout to simulate network latency in dev
    setTimeout(function() {
      dispatcher.dispatch({type: 'RECEIVE_POSTS', posts: response.data});
      // console.log(response.data);
    }, 0);
  }).catch(function(error) {
    console.log(error);
  });
}
