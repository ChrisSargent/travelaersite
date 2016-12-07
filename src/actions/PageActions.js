import axios from 'axios';
import dispatcher from '../dispatcher';

export function fetchPage(slug) {
  const params = {
    slug: slug,
    fields: 'acf,slug'
  }
  dispatcher.dispatch({type: 'FETCH_PAGE', id: 'fetchPage', loading: true});

  axios.get('/wp/v2/pages', {params}).then(function(response) {
    dispatcher.dispatch({type: 'RECEIVE_PAGE', pages: response.data, id: 'fetchPage', loading: false});
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
