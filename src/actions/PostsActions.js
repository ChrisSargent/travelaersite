import axios from 'axios';
import dispatcher from '../dispatcher';

export function fetchPosts() {
  dispatcher.dispatch({type: 'FETCH_POSTS'});
  dispatcher.dispatch({type: 'LOADING', id: 'fetchPosts'});
  axios.get('/wp/v2/posts/').then(function(response) {
    dispatcher.dispatch({type: 'RECEIVE_POSTS', posts: response.data, allPosts: true});
    dispatcher.dispatch({type: 'FINISHED_LOADING', id: 'fetchPosts'});
  }).catch(function(error) {
    console.log(error);
  });
}

export function fetchPost(slug) {
  var params = {
      'filter[name]': slug,
    }
  dispatcher.dispatch({type: 'FETCH_POSTS'});
  dispatcher.dispatch({type: 'LOADING', id: 'fetchPost'});
  axios.get('/wp/v2/posts/', {params}).then(function(response) {
    dispatcher.dispatch({type: 'RECEIVE_POSTS', posts: response.data});
    dispatcher.dispatch({type: 'FINISHED_LOADING', id: 'fetchPost'});
  }).catch(function(error) {
    console.log(error);
  });
}
