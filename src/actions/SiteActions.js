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

export function fetchOptions() {
  dispatcher.dispatch({type: 'FETCH_OPTIONS', id: 'fetchOptions', loading: false});
  axios.get('/acf/v2/options').then(function(response) {
    dispatcher.dispatch({type: 'RECEIVE_OPTIONS', options: response.data.acf, id: 'fetchOptions', loading: false});
    // console.log(response.data);
  }).catch(function(error) {
    console.log(error);
  });
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

// *****************************************************************************

export function fetchTeam() {
  const params = {
    fields: 'acf,content,id,title,menu_order'
  }
  dispatcher.dispatch({type: 'FETCH_TEAM', id: 'fetchTeam', loading: true});
  axios.get('/wp/v2/team_member', {params}).then(function(response) {
    // console.log(response.data);
    dispatcher.dispatch({type: 'RECEIVE_TEAM', team: response.data, id: 'fetchTeam', loading: false});
  }).catch(function(error) {
    console.log(error);
  });
}

// Before: 4.7KB, After: 3.1KB

// Available Fields
// _links: Object
// acf: Object
// content: Object
// date: "2016-11-15T11:54:18"
// date_gmt: "2016-11-15T11:54:18"
// guid: Object
// id: 217
// link: "http://travelaersite.dev/wordpress/team_member/mike-slone/"
// menu_order: 1
// modified: "2016-11-17T13:39:33"
// modified_gmt: "2016-11-17T13:39:33"
// slug: "mike-slone"
// template: ""
// title: Object
// type: "team_member"
