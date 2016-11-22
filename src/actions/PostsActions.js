import axios from 'axios';
import dispatcher from '../dispatcher';

export function fetchPosts(slug) {
  var params;

  if (slug === 'all') {
    params = false;
  } else {
    params = {
      'filter[name]': slug,
    }
  }

  dispatcher.dispatch({type: 'FETCH_POSTS'});
  axios.get('/wp/v2/posts/', {params}).then(function(response) {
    dispatcher.dispatch({type: 'RECEIVE_POSTS', posts: response.data, slug: slug});
  }).catch(function(error) {
    console.log(error);
  });
}
