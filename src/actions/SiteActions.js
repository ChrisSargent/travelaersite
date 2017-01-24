import axios from 'axios';
import dispatcher from '../dispatcher';

// *****************************************************************************

export function loading(id) {
  dispatcher.dispatch({type: 'LOADER', loading: true, id: 'loading_' + id});
  // console.log('Loading:' + id);
}

export function finished(id) {
  dispatcher.dispatch({type: 'LOADER', loading: false, id: 'loading_' + id});
  // console.log('Finished:' + id);
}

// *****************************************************************************

export function fetchMenu(location) {
  dispatcher.dispatch({type: 'FETCH_MENU', id: 'fetchMenu', loading: true});
  axios.get('/wp-api-menus/v2/menu-locations/' + location).then(function(response) {
    dispatcher.dispatch({type: 'RECEIVE_MENU', menu: response.data, location: location, id: 'fetchMenu', loading: false});
    // console.log(response.data);
  }).catch(function(error) {
    console.log(error);
  });
}


// *****************************************************************************

export function resetMessages() {
  dispatcher.dispatch({type: 'RESET_MESSAGE'});
}

// *****************************************************************************

// export function fetchOptions() {
//   dispatcher.dispatch({type: 'FETCH_OPTIONS', id: 'fetchOptions', loading: true});
//   axios.get('/acf/v2/options').then(function(response) {
//     dispatcher.dispatch({type: 'RECEIVE_OPTIONS', options: response.data.acf, id: 'fetchOptions', loading: false});
//     // console.log(response.data);
//   }).catch(function(error) {
//     console.log(error);
//   });
// }

export function fetchOptions() {
  return {
    type: 'FETCH_OPTIONS',
    payload: axios.get('/acf/v2/options')
  }
}

// *****************************************************************************

export function fetchPage(slug) {
  const params = {
    slug: slug,
    fields: 'acf,slug,id,title'
  }
  dispatcher.dispatch({type: 'FETCH_PAGE', id: 'fetchPage', loading: true});

  axios.get('/wp/v2/pages', {params}).then(function(response) {
    dispatcher.dispatch({type: 'RECEIVE_PAGE', page: response.data[0], id: 'fetchPage', loading: false});
    // console.log(response.data);
  }).catch(function(error) {
    console.log(error);
  });
}

// For all pages 40.6kb before field removal, 28kb after all fields except acf
// Available Fields
// _links: Object
// acf: Object
// author: 1
// comment_status: "closed"
// content: Object
// date: "2016-09-28T07:32:53"
// date_gmt: "2016-09-28T07:32:53"
// excerpt: Object
// featured_media: 0
// guid: Object
// id: 14
// link: "http://travelaersite.dev/wordpress/company/team/"
// menu_order: 0
// meta: Array[0]
// modified: "2016-11-29T19:34:56"
// modified_gmt: "2016-11-29T18:34:56"
// parent: 221
// ping_status: "closed"
// slug: "team"
// template: ""
// title: Object
// type: "page"
