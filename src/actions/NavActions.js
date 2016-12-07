import axios from 'axios';
import dispatcher from '../dispatcher';

export function fetchMenu(location) {
  dispatcher.dispatch({type: 'FETCH_MENU', id: 'fetchMenu', loading: true});
  axios.get('/wp-api-menus/v2/menu-locations/' + location).then(function(response) {
    dispatcher.dispatch({type: 'RECEIVE_MENU', menu: response.data, id: 'fetchMenu', loading: false});
    // console.log(response.data);
  }).catch(function(error) {
    console.log(error);
  });
}

// 3.1KB before field removal. (Can't remove menu fields using existing plugins)

// Available Fields
// ID: 21
// attr: ""
// base: "/"
// children: Array[0]
// classes: ""
// description: ""
// index: true
// link: "/"
// object: "page"
// object_id: 5
// object_slug: "home"
// order: 1
// parent: 0
// target: ""
// title: "Home"
// type: "post_type"
// type_label: "Page"
// url: "http://travelaersite.dev/wordpress/"
// xfn: ""
