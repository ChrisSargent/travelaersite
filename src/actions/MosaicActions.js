import axios from 'axios';
import dispatcher from '../dispatcher';

export function fetchMosaic() {
  const params = {
    fields: 'id,acf'
  }
  dispatcher.dispatch({type: 'FETCH_MOSAIC', id: 'fetchMosaic', loading: false});
  axios.get('/wp/v2/tiles', {params}).then(function(response) {
    dispatcher.dispatch({type: 'RECEIVE_MOSAIC', mosaic: response.data, id: 'fetchMosaic', loading: false});
    // console.log(response.data);
  }).catch(function(error) {
    console.log(error);
  });
}

// 12KB before field removal, 3.4KB after

// Available Fields
// links: Object
// acf: Object
// content: Object
// date: "2016-09-30T08:00:31"
// date_gmt: "2016-09-30T08:00:31"
// guid: Object
// id: 133
// link: "http://travelaersite.dev/wordpress/tiles/do-airlines-respond-to-customer-messages-on-facebook/"
// modified: "2016-11-11T16:03:07"
// modified_gmt: "2016-11-11T16:03:07"
// slug: "do-airlines-respond-to-customer-messages-on-facebook"
// template: ""
// title: Object
// type: "tiles"
