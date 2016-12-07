import axios from 'axios';
import dispatcher from '../dispatcher';

export function fetchPosts() {
  const params = {
    // fields: 'categories,content,date_gmt,id,title,t_author,t_comments_info,t_featured_image,t_tags'
  }
  dispatcher.dispatch({type: 'FETCH_POSTS', id: 'fetchPosts', loading: true});
  axios.get('/wp/v2/posts', {params}).then(function(response) {
    console.log(response.data);
    dispatcher.dispatch({type: 'RECEIVE_POSTS', posts: response.data, allPosts: true, id: 'fetchPosts', loading: false});
  }).catch(function(error) {
    console.log(error);
  });
}

export function fetchPost(slug) {
  const params = {
    'filter[name]': slug,
    // fields: 'categories,content,date_gmt,id,title,t_author,t_comments_info,t_featured_image,t_tags'
  }
  dispatcher.dispatch({type: 'FETCH_POSTS', id: 'fetchPost', loading: true});
  axios.get('/wp/v2/posts', {params}).then(function(response) {
    // console.log(response.data);
    dispatcher.dispatch({type: 'RECEIVE_POSTS', posts: response.data, id: 'fetchPost', loading: false});
  }).catch(function(error) {
    console.log(error);
  });
}

// Before:

// Available Fields
// _links: Object
// acf: false
// author: 1
// categories: Array[1]
// comment_status: "open"
// content: Object
// date: "2016-12-02T15:17:44"
// date_gmt: "2016-12-02T14:17:44"
// excerpt: Object
// featured_media: 0
// format: "standard"
// guid: Object
// id: 261
// link: "http://travelaersite.dev/wordpress/another-new-post-with-a-longer-title/"
// meta: Array[0]
// modified: "2016-12-02T15:17:44"
// modified_gmt: "2016-12-02T14:17:44"
// ping_status: "open"
// slug: "another-new-post-with-a-longer-title"
// sticky: false
// t_author: Object
// t_comments_info: Object
// t_featured_image: null
// t_tags: Array[0]
// tags: Array[0]
// template: ""
// title: Object
// type: "post"
